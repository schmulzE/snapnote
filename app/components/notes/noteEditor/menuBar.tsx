import { useFormStatus } from "react-dom";

const MenuBar = ({ editor, saveContentHandler, setLink, addImage } :  {editor: any, saveContentHandler: () => void, setLink : () => void, addImage:  () => void}) => {
  const { pending } = useFormStatus();
  if (!editor) {
    return null;
  }

  return (
    <div className="w-full z-50 p-2 rounded-full bg-content1">
      {/* Add your custom menu bar items here */}
      <button
        onClick={() => addImage()}
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
        disabled={pending}
        onClick={saveContentHandler}
        className='px-2 py-1 rounded'
      >
        <i className="ri-save-3-line"></i>
      </button>
      
      {/* Add more menu items as needed */}
    </div>
  );
};

export default MenuBar;