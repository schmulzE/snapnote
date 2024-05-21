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
import { useRouter } from 'next/navigation';

interface FormData {
  title?: string;
  content?: string;
  createdBy?: string | undefined;
  folder?: string | undefined;
  favourite: boolean;
}

const RichTextEditor = ({ initialContent, noteId, folderId } : { initialContent: string | undefined, noteId: string | undefined, folderId?: string}) => {
  const [ formData , setFormData] = useState<FormData>({title: '', content: '',  createdBy: undefined, folder: undefined, favourite: false})
  const editorRef = useRef<any>(null);
  const {data: session} = useSession();
  const router = useRouter();

  // console.log(initialContent)
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
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
    console.log('user', session?.user?.id)
    setFormData((prevState) => ({
      ...prevState,
      createdBy: session?.user?.id,
    }));
  }, [session?.user?.id])

  useEffect(() => {
    if(folderId) {
      setFormData((prevState) => ({
        ...prevState,
        folder: folderId,
      }));
    }
  }, [folderId])
  
  const HandleNoteContent = async () => {
    try {
      if(noteId) {
        // console.log(editorRef.current.getHTML())
        const res = await fetch(`http://localhost:3000/api/notes/${noteId}`,  {
          method: "PUT",
          headers: {"content-type": "application/json"},
          body: JSON.stringify({ formData }),
        });

        if (!res.ok) {
          throw new Error('Failed to fetch data')
        }
      }else {
        console.log(formData)
        const res = await fetch(`http://localhost:3000/api/notes/`,  {
          method: "POST",
          headers: {"content-type": "application/json"},
          body: JSON.stringify({ formData }),
        });

        if (!res.ok) {
          throw new Error('Failed to fetch data')
        }
      }   
      
      console.log('content saved!...')
      router.refresh()
      if(folderId) {
        router.push(`/folders/${folderId}`)
      }else {
        router.push('/notes')
      }
    } catch (error) {
      console.log(error)
    }
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
      editorRef.current.chain().focus().extendMarkRange('link').unsetLink()
        .run()

      return
    }

    // update link
    editorRef.current.chain().focus().extendMarkRange('link').setLink({ href: url })
      .run()
  }, [])

  return (
    <div className="relative">
      <EditorContent editor={editor} className='editor_content border-0 outline-none'/>
      <div className="fixed bottom-4 right-4">
        <MenuBar editor={editor} saveContentHandler={HandleNoteContent} setLink={setLink} />
      </div>
    </div>
  );
};


const MenuBar = ({ editor, saveContentHandler, setLink } :  {editor: any, saveContentHandler: () => void, setLink : () => void}) => {

  if (!editor) {
    return null;
  }

  return (
    <div className="bg-gray-200 p-2 rounded-full">
      {/* Add your custom menu bar items here */}
      <button
        onClick={() => editor.chain().focus().setImage().run()}
        className={`${editor.isActive('image') ? 'bg-blue-500 text-white' : ''} px-2 py-1 rounded`}
      >
       <i className="ri-image-2-fill"></i>
      </button>
      <button
        onClick={setLink}
        className={`${editor.isActive('link') ? 'bg-blue-500 text-white' : ''} px-2 py-1 rounded`}
      >
       <i className="ri-links-line"></i>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`${editor.isActive('heading', { level : 1}) ? 'bg-blue-500 text-white' : ''} px-2 py-1 rounded`}
      >
       <i className="ri-heading"></i>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`${editor.isActive('italic') ? 'bg-blue-500 text-white' : ''} px-2 py-1 rounded`}
      >
       <i className="ri-italic"></i>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`${editor.isActive('bold') ? 'bg-blue-500 text-white' : ''} px-2 py-1 rounded`}
      >
        <i className="ri-bold"></i>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`${editor.isActive('orderedList') ? 'bg-blue-500 text-white' : ''} px-2 py-1 rounded `}
      >
        <i className="ri-list-ordered"></i>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'bg-blue-500 text-white' : '' + ' px-2 py-1 rounded'}
      >
        <i className='ri-list-check'></i>
      </button>
      <button 
        onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} 
        className={`px-2 py-1 rounded`} 
      >
        <i className='ri-arrow-go-back-fill'></i>
      </button>
      <button 
        onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} 
        className='px-2 py-1 rounded'
      >
      </button>
        <i className='ri-arrow-go-forward-fill'></i>
      <button
        onClick={saveContentHandler}
        className='px-2 py-1 rounded'
      >
        <i className="ri-save-3-line"></i>
      </button>
      
      {/* Add more menu items as needed */}
    </div>
  );
};

export default RichTextEditor;