"use client"
import React from 'react'
import { deleteAllNotes } from '@/actions/notes';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';


const DeleteAllNotesButton = () => {
  const router = useRouter();

  const deleteAllNotesHandler = async() => {
    if(confirm('Are you sure you want to delete all Note') === true) {
      await deleteAllNotes()
      router.refresh()
    }
  }
  
  return (
    <div className='flex justify-between items-center'>
    <div>Delete all notes</div>
    <Button color='danger' onClick={deleteAllNotesHandler}>Delete all</Button>
  </div>
  )
}

export default DeleteAllNotesButton
