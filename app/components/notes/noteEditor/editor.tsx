"use client"

import React from 'react';
import { EditorContent } from '@tiptap/react';
import MenuBar from './menuBar';
import { useEditorLogic } from '@/hooks/useEditorLogic';

interface RichTextEditorProps { 
  initialContent: string | undefined, 
  noteId: string | undefined, 
  folderId?: string
  editable: boolean;
};

const RichTextEditor = ({ initialContent, noteId, folderId, editable }: RichTextEditorProps) => {
  const {
    editor,
    isEditable,
    handleNoteContent,
    setLink,
    addImage
  } = useEditorLogic({ initialContent, noteId, folderId, editable });

  return (
    <div className="relative font-mono">
      <EditorContent editor={editor} className='editor_content border-0 outline-none'/>
      <div className="fixed bottom-4 right-4">
        {isEditable && (
          <MenuBar 
            editor={editor} 
            saveContentHandler={handleNoteContent} 
            setLink={setLink} 
            addImage={addImage}
          />
        )}
      </div>
    </div>
  );
};

export default RichTextEditor;