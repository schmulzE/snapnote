"use client"

import React, { useState, useEffect } from 'react'
import { Button, Input, Textarea, DatePicker, Select, SelectItem} from '@nextui-org/react';
import { useRouter, usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import {parseDate,getLocalTimeZone, today} from "@internationalized/date";

interface FormData {
  title?: string;
  description?: string;
  dueDate?: string | null;
  tag?: string | undefined;
  createdBy?: string | undefined;
  isCompleted?: boolean;
}

interface Tag {
  _id: string | number;
  name: string;
}

const TodoForm = ({todo} : {todo? : any}) => {
  const [loading, setLoading ] = useState(false);
  let [value, setValue] = React.useState(today(getLocalTimeZone()));
  const [tags, setTags] = useState<Tag[]>([])
  const {data: session} = useSession();
  const router = useRouter();
  const pathname = usePathname()

  
  const todoData = {
    title: '', 
    description: "", 
    dueDate: null,
    tag: undefined, 
    createdBy: '',
    isCompleted: false
  }

  const EDITMODE = pathname === `/todos/${todo?._id}` ? true : false
  
  useEffect(() => {
    if (EDITMODE) {
    todoData["title"] = todo.title;
    todoData["description"] = todo.description;
    todoData["tag"] = todo.tag;
    todoData["createdBy"] = todo.createdBy;
    setValue(parseDate(todo.dueDate))
  }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [])
  const [formData, setFormData] = useState<FormData>(todoData);

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


  useEffect(() => {
    console.log('user', session?.user?.id)
    setFormData((prevState) => ({
      ...prevState,
      createdBy: session?.user?.id,
    }));
  }, [session?.user?.id])

  useEffect(() => {
    const day = value.day
    const month = value.month
    const year = value.year
    const date = `${year.toString()}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

    setFormData((prevState) => ({
      ...prevState,
      dueDate: date,
    }));
  }, [value])

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
    if (EDITMODE) {
      setLoading(true)
      const res = await fetch(`/api/todos/${todo._id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ formData }),
      });
      if (!res.ok) {
        throw new Error("Failed to update todo");
      }
    } else {
      setLoading(true)
      const res = await fetch("/api/todos", {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify({ formData }),
      });

      if (!res.ok) {
        throw new Error("Failed to create todo");
      }
    }

    setFormData({ title: "", description: "", tag: undefined })
    setValue(today(getLocalTimeZone()))

    setLoading(false)
    router.refresh();
    router.push("/todos");

  };

  return (
    <>
      <form onSubmit={handleSubmit} className='bg-gray-100 sticky top-0 w-full max-w-96 m-2 p-2 rounded-md max-h-[620px] flex flex-col justify-between'>
        <div className="space-y-4">
          <h1 className='capitalize text-xl font-semibold'>todo:</h1>
          <Input 
            type="text" 
            variant='flat' 
            required
            name="title"
            className='mb-6'
            onChange={handleChange} 
            value={formData.title}
            placeholder="Enter your title"
          />
          <Textarea
            variant={'flat'}
            name="description"
            labelPlacement="outside"
            placeholder="Enter your description"
            onChange={handleChange}
            value={formData.description}
            className="col-span-12 md:col-span-6 mb-6 md:mb-0"
          />
          <Select
            labelPlacement={'outside-left'}
            label="Tag"
            placeholder="Select tag"
            className={'flex items-center'}
            onChange={handleChange}
            value={formData.tag}
            name='tag'
          >
            {tags.map((tag) => (
              <SelectItem key={tag._id} value={tag._id}>
                {tag.name}
              </SelectItem>
            ))}
          </Select>
          <DatePicker 
            label="Due date" 
            labelPlacement="outside-left"
            onChange={setValue}
            value={value}
            name="dueDate"
          />
        </div>

        <div className='flex justify-between'>
          <Button type="button" color="danger" radius="none">
          {EDITMODE ? 'Delete Todo' : 'Cancel'}
          </Button>
          <Button type='submit' isLoading={loading} isDisabled={loading} color="success" radius="none">
            {EDITMODE ? 'Save Todo' : 'Add Todo'}
          </Button>
        </div>
      </form>
    </>
  )
}

export default TodoForm