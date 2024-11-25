"use client";

import React, { Dispatch, SetStateAction, useEffect, useReducer, useState } from 'react';
import { Button } from '@nextui-org/react';
import Popover from '@/app/components/ui/popover';
import { Listbox, ListboxItem } from "@nextui-org/listbox";
import { usePathname, useRouter } from "next/navigation";
import Modal from '../ui/modal';
import SelectTag from './selectTag';
import SortComponent from './sortComponent';
import FilterComponent from './filterComponent';
import Breadcrumb from '../ui/breadcrumb';
import FolderForm from '../folders/folderForm';
import { Tag } from '@/models/tag';
import { Folder } from '@/models/folder';
import { Note } from '@/models/note';
import { getTags } from '@/actions/tags';
import {Tooltip} from "@nextui-org/tooltip";
import ShareNoteForm from './shareNoteForm';
import ToggleSidebarButton from './toggleSidebarButton';
import ListboxWrapper from '@/app/components/ui/listBoxWrapper';
import { addNoteToFavourite, deleteNote } from '@/actions/notes';
import { deleteFolder } from '@/actions/folders';
import { initialState, modalReducer } from '@/app/reducers/modalReducer';

interface PopoverContentProps { 
  deleteHandler: () => void, 
  isFavourite: boolean | undefined, 
  toggleFavourite: () => void
}
function PopoverContent({deleteHandler, isFavourite, toggleFavourite} : PopoverContentProps) {

  return (
    <ListboxWrapper>
      <Listbox aria-label="Actions">
        <ListboxItem key="favourites" onPress={toggleFavourite}>
          {isFavourite ? 'Remove from favourite' : 'Add to favourite'}
        </ListboxItem>
        <ListboxItem onPress={deleteHandler} key="delete" className="text-danger" color="danger">
          Delete
        </ListboxItem>
      </Listbox>
    </ListboxWrapper>
  );
}

interface ToolbarProps{
  title: string;
  id: string;
  isFavourite: boolean | undefined;
  tag?: string;
  url?: string;
  setState?: Dispatch<SetStateAction<Note[] | Folder[]>>;
  folderName?: string;
  setFilterByFavorite?: Dispatch<SetStateAction<boolean>>;
  setFilterByNoTag?: Dispatch<SetStateAction<boolean>>
  setSortAlphabetically?: Dispatch<SetStateAction<boolean>>
  setSortByDate?: Dispatch<SetStateAction<boolean>>
}

const Toolbar = (
  { title, 
    id, 
    tag, 
    isFavourite, 
    setState, 
    folderName, 
    url, 
    setFilterByFavorite, 
    setFilterByNoTag, 
    setSortAlphabetically, 
    setSortByDate
  } : ToolbarProps) => {
  const [ formData , setFormData] = useState<Note>({favourite: isFavourite});
  const [tags, setTags] = useState<Tag[]>([]);
  const router = useRouter();
  const pathname = usePathname();
  const [state, dispatch] = useReducer(modalReducer, initialState);

  const DYNAMICROUTE = pathname === `/${title}/${id}`;
  const SINGLEROUTE = pathname === `/${title}`

  const openModal = (title: string, content: React.ReactNode) => {
    dispatch({ type: 'OPEN_MODAL', title, content });
  };

  const closeModal = () => {
    dispatch({ type: 'CLOSE_MODAL' });
  };

  async function fetchTags() {
    const data = await getTags()
    setTags(data); 
  };
  
  useEffect(() => {
    fetchTags();
  }, []);


  const deleteHandler = async () => {
    if(confirm('Are you sure want to delete') === true) {
      title === 'folders' ? await deleteFolder(id) : await deleteNote(id)
      router.refresh();
      router.push(`/${title}`);
    }
  };

  const toggleFavourite = async() => {
    const updatedFormData = { ...formData, favourite: !formData.favourite };
    setFormData(updatedFormData);
    addNoteToFavourite(id, !formData.favourite);
  }


  return (
    <>
      <div className="flex justify-between px-0 lg:px-4 items-center capitalize my-3">
        <div className='flex items-center gap-2'>
          <ToggleSidebarButton/>
          <h1 className='text-xl lg:text-4xl font-bold capitalize'>{title}</h1>
          { SINGLEROUTE && title === 'folders' ? 
            <Tooltip radius='none' content='Add new folder'>
              <Button 
              size='sm' 
              onClick={() => openModal('Add new folder', <FolderForm onClose={closeModal} folderId=''/>)} 
              className='border bordered-gray-200 bg-transparent flex items-center'
              >
                <i className='ri-add-fill text-lg'></i>
                Add folder
              </Button>
            </Tooltip>
           : null
          }
        </div>

         { DYNAMICROUTE && title === 'folders' ? <Breadcrumb folderName={folderName}/> : null }

        <div className='space-x-3'>
          { SINGLEROUTE && title !== 'folders' || DYNAMICROUTE && title === 'folders' ? 
          <Popover 
          button={
            <Button isIconOnly className='outline-none bg-transparent'>
              <i className="ri-filter-3-line text-xl"></i>
            </Button>
          } 
          content={<FilterComponent setFilterByNoTag={setFilterByNoTag} setFilterByFavorite={setFilterByFavorite} />}/>
          : null}
    
          { SINGLEROUTE && title !== 'folders' || DYNAMICROUTE && title === 'folders' ?
            <Popover 
            button={
              <Button isIconOnly className='outline-none bg-transparent'>
                <i className="ri-sort-asc text-xl"></i>
              </Button>
            } 
            content={<SortComponent setSortByDate={setSortByDate!} setSortAlphabetically={setSortAlphabetically!} setState={setState} />}
            /> 
          : null}
            
          { DYNAMICROUTE && title !== 'folders' ?
            <Tooltip 
            radius='none' 
            content={'add tag'}>
              <button
              onClick={
                () => openModal('Select Tag', <SelectTag text={title} tags={tags} onClose={closeModal} tagId={tag} id={id}/>)
                } 
              className='bg-transparent'
              >
                <i className='ri-bookmark-line'></i>
              </button>
            </Tooltip> 
          : null}

          { DYNAMICROUTE && title !== 'folders' ?
          <Popover 
          button={<button className='outline-none bg-transparent'><i className="ri-more-2-fill"></i></button>} 
          content={<PopoverContent deleteHandler={deleteHandler} toggleFavourite={toggleFavourite} isFavourite={formData.favourite}/>}
          />
          : null}
           
          { DYNAMICROUTE && title === 'notes' && 
            <Button
            className='text-white bg-blue-500'
            onClick={() => openModal('Share Note', <ShareNoteForm noteId={id} url={url!}/>)} 
            > 
            Share 
            </Button>
          }
        </div>
      </div>

      <Modal isOpen={state.isOpen} onClose={closeModal} title={state.title} size={'sm'}>
        {state.content}
      </Modal>

    </>
  )
}

export default Toolbar;