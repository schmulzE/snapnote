"use client"

import React, { memo } from 'react';
import FolderItem from './folderItem';
import { Folder } from '@/models/folder';

interface FolderListProps {
  folders: Folder[];
  onOpen: () => void;
  setFolderId: React.Dispatch<React.SetStateAction<string>>;
}

const FolderList: React.FC<FolderListProps> = ({ folders, onOpen, setFolderId }) => {
  return (
    <ul className='flex flex-wrap gap-4 mt-3 relative p-4'>
      {folders.map((folder: Folder) => (
        <FolderItem key={folder._id} folder={folder} onOpen={onOpen} setFolderId={setFolderId} />
      ))}
    </ul>
  );
};

export default memo(FolderList);
