"use client"
import { useDisclosure } from '@nextui-org/react';
import React, { useCallback, useState } from 'react';
import Modal from '../ui/modal';
import FolderForm from '../folders/folderForm';
import Toolbar from '../shared/toolbar';
import { Folder } from '@/models/folder';
import { Note } from '@/models/note';
import FolderList from '../folders/folderList';

const FolderView = ({ folders } : { folders : Folder[]}) => {
  const { onClose, isOpen, onOpen } =  useDisclosure();
  const [folderId, setFolderId] = useState('');
  const [data, setData] = useState<Note[] | Folder[]>(folders);
  const [filterByFavorite, setFilterByFavorite] = useState(false);
  const [filterByNoTag, setFilterByNoTag] = useState(false);
  const [sortByDate, setSortByDate] = useState(false);
  const [sortAlphabetically, setSortAlphabetically] = useState(false);

  // const filterFolders = useCallback((folders: Folder[]) => {
  //   let filteredFolders = [...folders];
  
  //   if (filterByNoTag) {
  //     filteredFolders = filteredFolders.filter((folder) => !folder.tag);
  //   }
  
  //   if (filterByFavorite) {
  //     filteredFolders = filteredFolders.filter((folder) => folder.favourite);
  //   }
  
  //   return filteredFolders;
  // }, [filterByFavorite, filterByNoTag]);

  // const sortFolders = useCallback((folders: Folder[]) => {
  //   let sortedFolders = [...folders];
  
  //   if (sortByDate) {
  //     sortedFolders = sortedFolders.sort((a, b) => new Date(a.createdAt!).getTime() - new Date(b.createdAt!).getTime());
  //   }
  
  //   if (sortAlphabetically) {
  //     sortedFolders = sortedFolders.sort((a, b) => a.name!.localeCompare(b.name!));
  //   }
  
  //   return sortedFolders;
  // }, [sortAlphabetically, sortByDate]);

  // const filteredFolders = filterFolders(folders);
  // const sortedFolders = sortFolders(folders);

  return (
    <>
      <Toolbar 
      title={'folders'} 
      id={''} 
      isFavourite={false}
      setState={setData}
      setFilterByNoTag={setFilterByNoTag}
      setFilterByFavorite={setFilterByFavorite}
      setSortByDate={setSortByDate}
      setSortAlphabetically={setSortAlphabetically}
      />
      <FolderList folders={folders} onOpen={onOpen} setFolderId={setFolderId}/>

      <Modal onClose={onClose} size='sm' isOpen={isOpen} title={'Edit Folder'}>
        <FolderForm onClose={onClose} folderId={folderId}/>
      </Modal>
    </>
  )
}

export default FolderView