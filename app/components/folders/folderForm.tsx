"use client"

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import  { Folder } from '@/models/folder';
import SubmitButton from '../ui/submitButton';
import {Input, Button} from "@nextui-org/react";
import { getFolder, handleFolder } from '@/actions/folders';


const FolderForm = ({ onClose, folderId } : {onClose : () => void, folderId: string} ) => {
  const ref = useRef<HTMLFormElement>(null);
  const [folder, setFolder] = useState<Folder>({name: ''});
  const router = useRouter()

  async function handleSubmit(formData: FormData) {
    if (folderId) {
      return handleFolder(formData, folderId); 
    } else {
     return handleFolder(formData);
    }
  }

  const fetchFolder = useCallback( async(id: string) => {
    const data = await getFolder(id)
    setFolder(data);
  }, []);

  useEffect(() => {
    if(folderId) {
      fetchFolder(folderId)
    }
  }, [fetchFolder, folderId]);

  const closeModalHandler = () => {
    ref.current?.reset()
    onClose();
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFolder(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <>
      <form 
      ref={ref} 
      action={async (formData) => {
        onClose(); 
        ref.current?.reset(); 
        await handleSubmit(formData);
        router.refresh()
      }} 
      className='z-50 px-2'
      >
        <Input 
          type="text" 
          variant='underlined' 
          label="name" 
          required
          name="name"
          className='mb-6'
          value={folder.name}
          onChange={handleChange}
        />

        <div className='flex w-full gap-x-4 justify-end'>
          <Button color="default" variant="light" type='button' onClick={closeModalHandler} className='uppercase rounded-none'>
            cancel
          </Button>
          <SubmitButton text={'submit'} color={'primary'} className={'rounded-xs uppercase'}/>
        </div>
      </form>
    </>
  )
}

export default FolderForm
