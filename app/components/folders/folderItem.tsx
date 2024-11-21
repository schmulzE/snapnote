"use client"

import React from 'react';
import Link from 'next/link';
import generateColorFromText from '@/utils/generateColorFromText';
import Dropdown from '../ui/dropdown';
import { useRouter } from 'next/navigation';
import { deleteFolder } from '@/actions/folders';

interface FolderItemProps {
  folder: any;
  onOpen: () => void;
  setFolderId: React.Dispatch<React.SetStateAction<string>>;
}

const FolderItem: React.FC<FolderItemProps> = ({ folder, onOpen, setFolderId }) => {
  const router = useRouter();

  const deleteFolderHandler = async (folderId: string) => {
    if (confirm("Are you sure you want to delete this folder?") === true) {
      await deleteFolder(folderId);
      router.refresh();
      router.push('/folders');
    }
  };

  const editFolderHandler = async (folderId: string) => {
    onOpen();
    setFolderId(folderId);
  };

  const menuItems = [
    {
      key: 'edit',
      text: "Edit folder",
      event: editFolderHandler
    },
    {
      key: 'delete',
      text: "Delete folder",
      event: deleteFolderHandler
    }
  ];

  return (
    <li key={folder._id} className='w-80 h-48 shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)] p-4 rounded-md relative'>
      <div className='flex justify-between absolute top-2 right-0 px-4 w-full'>
        <i style={{ color: generateColorFromText(folder.name) }} className="ri-folder-5-fill text-3xl"></i>
        <Dropdown 
        id={folder._id} 
        variant={'flat'} 
        isIconOnly={true} 
        buttonText={''} 
        menuItems={menuItems} 
        buttonClass='bg-transparent' 
        buttonIcon={<i className="ri-more-fill text-xl"></i>} 
        />
      </div>
      <Link href={`/folders/${folder._id}`} className='w-full h-full flex flex-col justify-between rounded-md relative'>
        <div className='flex-1 content-end'>
          <h1 className='uppercase text-xl font-medium'>{folder.name}</h1>
          <p>{folder.totalNotes} Notes</p>
        </div>
      </Link>
    </li>
  );
};

export default FolderItem;
