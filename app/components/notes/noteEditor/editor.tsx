"use client"

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import Placeholder from '@tiptap/extension-placeholder';
import TextStyle from '@tiptap/extension-text-style';
import ListItem from '@tiptap/extension-list-item';
import TextAlign from '@tiptap/extension-text-align';
import OrderedList from '@tiptap/extension-ordered-list';
import { useSession } from 'next-auth/react';
import Image from '@tiptap/extension-image'
import {Note} from '@/models/note';
import { createNote, editNote } from '@/actions/notes';
import { useFormState } from 'react-dom';
import { toast } from 'sonner';
import MenuBar from './menuBar';

interface RichTextEditorProps { 
  initialContent: string | undefined, 
  noteId: string | undefined, 
  folderId?: string
  editable: boolean;
};

const Editor = ({ initialContent, noteId, folderId, editable } : RichTextEditorProps) => {
  const [ formData , setFormData] = useState<Note>(
    {
      title: '', 
      content: '',  
      createdBy: undefined, 
      folder: undefined, 
      favourite: false, 
      image: ''
    }
  );
  const [state, formAction] = useFormState(createNote, {success: false, message: ''});
  const [isEditable, setIsEditable] = useState(editable);
  const editorRef = useRef<any>(null);
  const {data: session} = useSession();

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
      setFormData(prevState =>  ({...prevState, content : editor.getHTML()}))
    },

  });

  useEffect(() => {
    if (!editorRef.current) {
      editorRef.current = editor;
      editorRef.current?.commands.focus('end')

      const firstHeading = editorRef.current?.$node('heading')
      if (firstHeading) {
        setFormData((prevState) => ({
          ...prevState,
        title: firstHeading?.textContent,
      }));
    }

    }

    return () => {
      editorRef.current?.destroy()
    }
  }, [editor]);

  useEffect(() => {
    if(state.message) {
      toast.info(state.message)
    }
  }, [state.message]);

  useEffect(() => {
    console.log('user', session?.user?.id)
    setFormData((prevState) => ({
      ...prevState,
      createdBy: session?.user?.id,
    }));
  }, [session?.user?.id]);

  useEffect(() => {
    if(folderId) {
      setFormData((prevState) => ({
        ...prevState,
        folder: folderId,
      }));
    }
  }, [folderId]);


  const addImage =() => {
    let input = document.createElement('input');
    input.type="file";
    setTimeout(function(){
      input.click();
    },200);
    input.addEventListener('change', async (e :any) => {
      try {
        const file = e.target!.files[0];
        input.setAttribute("disabled", '');
        
        if (!file || file.length === 0) {
          throw new Error('You must select an image to upload.')
        }
        
        const imageUrl = URL.createObjectURL(file);
        
          setFormData((prevState) => ({
            ...prevState,
          image: imageUrl,
        }));
  
        editorRef.current?.chain().focus().setImage({ src: imageUrl }).run();
  
      } catch (error) {
        if(error instanceof Error){
          console.log(error.message)
        }
      } finally {
        input.removeAttribute('disabled');
      }
    })
  };

  
  const HandleNoteContent = async () => {
    noteId ? await editNote(formData, noteId) : formAction(formData);
  }

  const setLink = useCallback(() => {
    const previousUrl = editorRef.current.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    // cancelled
    if (url === null) {
      return
    }

    // empty
    if (url === '') {
      editorRef.current.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }

    // update link
    editorRef.current.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }, [])

  

  return (
    <div className="relative">
      <EditorContent editor={editor} className='editor_content border-0 outline-none'/>
      <div className="fixed bottom-4 right-4">
       {isEditable ? <MenuBar editor={editor} saveContentHandler={HandleNoteContent} setLink={setLink} addImage={addImage}/>: null}
      </div>
    </div>
  );
};


export default Editor;