"use client"

import { useCallback, useEffect, useRef, useState } from 'react';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import Placeholder from '@tiptap/extension-placeholder';
import TextStyle from '@tiptap/extension-text-style';
import ListItem from '@tiptap/extension-list-item';
import TextAlign from '@tiptap/extension-text-align';
import OrderedList from '@tiptap/extension-ordered-list';
import Image from '@tiptap/extension-image';
import { useSession } from 'next-auth/react';
import { Note } from '@/models/note';
import { createNote, editNote } from '@/actions/notes';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface RichTextEditorProps {
  initialContent: string | undefined;
  noteId: string | undefined;
  folderId?: string;
  editable: boolean;
}

export const useEditorLogic = ({ initialContent, noteId, folderId, editable }: RichTextEditorProps) => {
  const [formData, setFormData] = useState<Note>({
    title: '',
    content: '',
    createdBy: undefined,
    folder: undefined,
    favourite: false,
    image: ''
  });
  
  const [isEditable, setIsEditable] = useState(editable);
  const editorRef = useRef<any>(null);
  const { data: session } = useSession();
  const router = useRouter();

  const editor = useEditor({
    editable: isEditable,
    extensions: [
      StarterKit,
      TextStyle,
      Image.configure({
        HTMLAttributes: {
          class: 'w-64',
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: 'list-decimal ml-4',
        },
      }),
      ListItem.configure({
        HTMLAttributes: {
          class: 'list-disc ml-4',
        },
      }),
      Heading.configure({
        levels: [1, 2, 3],
        HTMLAttributes: {
          class: 'text-2xl font-bold',
        },
      }),
      Placeholder.configure({
        showOnlyWhenEditable: true,
        placeholder: "Write something or press Enter to add a new block",
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Placeholder.configure({
        placeholder: 'My Custom Placeholder',
      })
    ],
    content: initialContent,
    onUpdate: ({ editor }) => {
      setFormData(prevState => ({ ...prevState, content: editor.getHTML() }));
    },
  });

  useEffect(() => {
    if (!editorRef.current) {
      editorRef.current = editor;
      editorRef.current?.commands.focus('end');

      const firstHeading = editorRef.current?.$node('heading');
      if (firstHeading) {
        setFormData((prevState) => ({
          ...prevState,
          title: firstHeading?.textContent,
        }));
      }
    }

    return () => {
      editorRef.current?.destroy();
    };
  }, [editor]);

  useEffect(() => {
    setFormData((prevState) => ({
      ...prevState,
      createdBy: session?.user?.id,
    }));
  }, [session?.user?.id]);

  useEffect(() => {
    if (folderId) {
      setFormData((prevState) => ({
        ...prevState,
        folder: folderId,
      }));
    }
  }, [folderId]);

  const addImage = useCallback(() => {
    const input = document.createElement('input');
    input.type = "file";
    
    setTimeout(() => {
      input.click();
    }, 200);
    
    input.addEventListener('change', async (e: any) => {
      try {
        const file = e.target!.files[0];
        input.setAttribute("disabled", '');
        
        if (!file || file.length === 0) {
          throw new Error('You must select an image to upload.');
        }
        
        const imageUrl = URL.createObjectURL(file);
        
        setFormData((prevState) => ({
          ...prevState,
          image: imageUrl,
        }));
  
        editorRef.current?.chain().focus().setImage({ src: imageUrl }).run();
      } catch (error) {
        if (error instanceof Error) {
          throw error;
        }
      } finally {
        input.removeAttribute('disabled');
      }
    });
  }, []);

  const handleNoteContent = useCallback(async () => {
    try {
      const result = noteId
        ? await editNote(formData, noteId)
        : await createNote(formData);
  
      if (result.success) {
        toast.success(result.message || `Note ${noteId ? 'updated' : 'created'} successfully`);
        router.refresh();
        
        const redirectPath = folderId
          ? `/folders/${folderId}`
          : '/notes';
          
        router.push(redirectPath);
      } else {
        toast.error(result.message || `Failed to ${noteId ? 'edit' : 'create'} note`);
      }
    } catch (error) {
      toast.error('Failed to save note');
    }
  }, [formData, noteId, folderId, router]);

  const setLink = useCallback(() => {
    if (!editorRef.current) return;
    
    const previousUrl = editorRef.current.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    if (url === null) return;
    if (url === '') {
      editorRef.current.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editorRef.current.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, []);

  return {
    editor,
    editorRef,
    isEditable,
    setIsEditable,
    handleNoteContent,
    setLink,
    addImage
  };
};