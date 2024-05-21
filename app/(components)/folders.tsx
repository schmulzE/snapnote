"use client"
import { Button, useDisclosure } from '@nextui-org/react';
import React from 'react';
import Modal from './modal';
import FolderForm from './folderForm';
import Link from 'next/link';
import generateColorFromText from '@/utils/generateColorFromText';

const Folders = ({folders} : {folders : any}) => {
  const { onClose, isOpen, onOpen } =  useDisclosure()
  return (
    <>
      <div className='flex items-center gap-2 my-2'>  
        <h1 className='text-4xl font-medium'>Folders</h1>
        <Button size='sm' className='flex items-center p-1' variant='bordered' onClick={onOpen}>
          <i className='ri-add-line text-lg'></i>
          <span className='capitalize'>new folder</span>
        </Button>
      </div>

      <div className='flex my-2'>
        <Button isIconOnly className='bg-transparent'>
          <i className="ri-dashboard-line text-xl"></i>
        </Button>
        <Button isIconOnly className='bg-transparent'>
          <i className="ri-menu-line text-xl"></i>
        </Button>
      </div>

      <ul className='flex flex-wrap gap-4'>
        {folders.map((folder: any) => (
          <li key={folder._id} className='w-80 h-48 border p-4 rounded-md'>
            <Link href={`/folders/${folder._id}`} className='w-full h-full flex flex-col justify-between rounded-md'>
              <div className='flex justify-between'>
                <i style={{ color: generateColorFromText(folder.name)}} className="ri-folder-5-fill text-3xl"></i>
                <button><i className="ri-more-fill text-xl"></i></button>
              </div>
              <div>
                <h1 className='uppercase text-xl font-medium'>{folder.name}</h1>
                <p>{folder.totalNotes} Notes</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <Modal onClose={onClose} isOpen={isOpen} title={'Create Folder'}>
        <FolderForm onClose={onClose}/>
      </Modal>
    </>
  )
}

export default Folders