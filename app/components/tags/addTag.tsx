"use client"

import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input } from '@nextui-org/react';
import { createTag } from '@/actions/tags';
import { useFormState } from 'react-dom';
import { Tag } from '@/models/tag';
import { toast } from 'sonner';

const AddTag = () => {
  const router = useRouter()
  const [state, formAction] = useFormState(createTag , { message: ''});
  const ref = useRef<HTMLFormElement>(null);
  const [showForm, setShowForm ] = useState(false);
  const [formData, setFormData ] = useState<Tag>({ name: '', createdBy: ''});

  useEffect(() => {
    if(state?.message.indexOf('Created tag') === 0) {
      ref.current?.reset();
      toast.info(state.message)
      router.refresh()
    }else if(state?.message) {
      toast.info(state.message);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.message]);

  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.value;
    setFormData((prevState) => ({
      ...prevState,
      name: value,
    }));
  };

  return (
    <div className='m-0'>
      {showForm && (
        <form action={formAction} className='flex mt-0'>
          <Input variant='underlined' id='tag' placeholder='Add new tag...' value={formData.name} onChange={handleChange} required/>
          <Button isIconOnly type='button' onClick={() => {setShowForm(false); setFormData({name: '', createdBy: ''})}} className='bg-transparent'><i className='ri-close-fill text-xl'></i></Button>
          <Button isIconOnly disabled={ formData.name!.length < 3 } type='submit' className='bg-transparent disabled:cursor-not-allowed'><i className='ri-check-fill text-xl'></i></Button>
        </form>
      )}
      {!showForm && <Button onClick={() => setShowForm(true)} className='bg-transparent text-left inline-flex justify-start items-center p-1 mt-0'><i className='ri-add-fill text-xl'> </i> <span>Add New Tag</span></Button>}
    </div>
  )
}

export default AddTag
