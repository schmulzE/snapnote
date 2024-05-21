"use client"

import React, { useEffect, useState } from 'react';
import {Input, Select, SelectItem, Button} from "@nextui-org/react";
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

interface FormData {
  name: string;
  tag: string | undefined;
  createdBy: string | undefined;
}


interface Tag {
  _id: string | number;
  name: string;
}

const FolderForm = ({ onClose } : {onClose : () => void}) => {
  const [formData, setFormData] = useState<FormData>({name: '', tag: undefined, createdBy: ''});
  const [loading, setLoading ] = useState(false);
  const [tags, setTags] = useState<Tag[]>([])
  const router = useRouter();
  const {data: session} = useSession();

  useEffect(() => {
    setFormData((prevState) => ({
      ...prevState,
      createdBy: session?.user?.id,
    }));
  }, [session?.user?.id])

  useEffect(() => {
    async function getTags() {
      try {
        const res = await fetch(`http://localhost:3000/api/tags`,  {
          cache: "no-store",
        });
       
        if (!res.ok) {
          throw new Error('Failed to fetch data')
        }
       
        const data = await res.json()
        setTags(data.tags)
        
      } catch (error) {
        console.log(error)
      }
    }
    getTags()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.value;
    const name = e.target.name;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  

  const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true)
      const res = await fetch(`/api/folders`, {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify({ formData }),
      });

      if (!res.ok) {
        throw new Error("Failed to create note");
      }

      const { folder } = await res.json();
      router.refresh()
      router.push(`/folders/${folder._id}`);

      setLoading(false);
      setFormData({ name: '', tag: '', createdBy: ''});
      onClose();

    }catch(e) {
      console.log(e)
    }

  };

  const closeModalHandler = () => {
    setFormData({ name: '', tag: '', createdBy: ''})
    onClose();
  }

  return (
    <>
      <form onSubmit={handleSubmit} className=''>
        <Input 
          type="text" 
          variant='underlined' 
          label="name" 
          required
          name="name"
          className='mb-6'
          onChange={handleChange} 
          value={formData.name}
        />
        <Select 
          label="Select a tag" 
          className="max-w-xs mb-6" 
          name='folder'
          variant='underlined'
          onChange={handleChange}
          value={formData.tag}
        >
          {tags.map((tag) => (
            <SelectItem key={tag._id} value={tag._id}>
              {tag.name}
            </SelectItem>
          ))}
        </Select>

        <div className='flex w-full gap-x-4 justify-end'>
          <Button color="danger" variant="light" type='button' onClick={closeModalHandler} className=' uppercase rounded-none'>
            cancel
          </Button>
          <Button disabled={loading} isLoading={loading} color="primary" type='submit' className='uppercase rounded-none'>
            submit
          </Button>
        </div>
      </form>
    </>
  )
}

export default FolderForm
