"use client"

import React, {useEffect, useState} from 'react';
import { Checkbox } from "@nextui-org/react";
import Link from 'next/link';

interface FormData {
  title?: string;
  description?: string;
  dueDate?: string | null;
  tag?: string | undefined;
  createdBy?: string | undefined;
  isCompleted?: boolean;
}

const Todos = ({ todos, id }: {todos: any, id?: string}) => {
  const [formData, setFormData] = useState<FormData>({ isCompleted: false});
  const [todo, setNote] = useState<any>({});

  useEffect(() => {
    async function fetchSingleTodo(id: string | undefined) {
      try {
        const res = await fetch(`http://localhost:3000/api/todos/${id}`,  {
          cache: "no-store",
        });
        
        if (!res.ok) {
          throw new Error('Failed to fetch data')
        }
        
        const data = await res.json()
        setNote(data?.todo)
        
      } catch (error) {
        console.log(error)
      }
    }
    if(id) {
      fetchSingleTodo(id)
    }
  }, [id])

  const handleOnChange = async() => {
    setFormData((prev) => ({
      ...prev,
      isCompleted : !formData.isCompleted
    }))

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
  }

  return (
    <div className='w-full h-screen'>
      <h1 className='text-4xl font-bold capitalize mt-4 mb-8'>{'Todo'}</h1>
      <Link href="/todos/create" className='capitalize border-y-1 w-full py-2 flex items-center'>
        <i className="ri-add-fill text-xl text-gray-500"></i>
        <span className='text-md'>add new todo</span>
      </Link >
      <ul className='flex flex-wrap gap-2 w-full'>
        {todos.map((todo: any, index: number) => (
          <li key={index} className='text-left cursor-pointer rounded-md border-b-1 w-full py-2 flex justify-between items-center'>
            <Checkbox onChange={handleOnChange} isSelected={formData.isCompleted} lineThrough={formData.isCompleted} className='capitalize'>{todo.title}</Checkbox>
            <Link href={`/todos/${todo._id}`} className={`block`}>
              <i className='ri-arrow-right-s-line text-xl'></i>
            </Link>
          </li>
        ))}      
      </ul>
    </div>
  )
}

export default Todos