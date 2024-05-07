"use client"

import React, { useEffect, useRef } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextStyle from '@tiptap/extension-text-style';

const RichTextEditor = ({ initialContent, noteId } : { initialContent: string, noteId: string}) => {
  const editorRef = useRef<any>(null);
  console.log(initialContent)
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,  
    ],
    content: initialContent || '<p>Start typing...</p>',
  });

  useEffect(() => {
    if (!editorRef.current) {
      editorRef.current = editor;
      editorRef.current?.commands.focus('end')
    }

    return () => {
      editorRef.current?.destroy()
    }
  }, [editor]);

  const editNoteContent = async () => {
    try {
      console.log(editorRef.current.getHTML())
      const res = await fetch(`http://localhost:3000/api/notes/${noteId}`,  {
        method: "PUT",
        headers: {"content-type": "application/json"},
        body: JSON.stringify({ content : editorRef.current?.getHTML() }),
      });
      
      if (!res.ok) {
        throw new Error('Failed to fetch data')
      }
      
      console.log('content saved!...')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="relative">
      <EditorContent editor={editor} className='editor_content border-0 outline-none'/>
      <div className="fixed bottom-4 right-4">
        <MenuBar editor={editor} saveContentHandler={editNoteContent} />
      </div>
    </div>
  );
};


const MenuBar = ({ editor, saveContentHandler } :  {editor: any, saveContentHandler: () => void}) => {

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
        onClick={() => editor.chain().focus().setImage().run()}
        className={`${editor.isActive('bold') ? 'bg-blue-500 text-white' : ''} px-2 py-1 rounded`}
      >
       <i className="ri-links-line"></i>
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
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`${editor.isActive('bold') ? 'bg-blue-500 text-white' : ''} px-2 py-1 rounded`}
      >
        <i className="ri-align-left"></i>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`${editor.isActive('bold') ? 'bg-blue-500 text-white' : ''} px-2 py-1 rounded`}
      >
        <i className="ri-align-center"></i>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`${editor.isActive('bold') ? 'bg-blue-500 text-white' : ''} px-2 py-1 rounded`}
      >
        <i className="ri-align-right"></i>
      </button>
      <button
        onClick={saveContentHandler}
        className={`${editor.isActive('bold') ? 'bg-blue-500 text-white' : ''} px-2 py-1 rounded`}
      >
        <i className="ri-save-3-line"></i>
      </button>
      
      {/* Add more menu items as needed */}
    </div>
  );
};

export default RichTextEditor;