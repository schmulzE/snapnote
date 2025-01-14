"use client"

import { Tag } from '@/models/tag';
import { Todo } from '@/models/todo';
import { getTags } from '@/actions/tags';
import { useRouter, usePathname } from 'next/navigation';
import { createTodo, deleteTodo, editTodo } from '@/actions/todos';
import { parseDate, getLocalTimeZone, today } from "@internationalized/date";
import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import { Button, Input, Textarea, DatePicker, Select, SelectItem } from '@nextui-org/react';

const TodoForm = ({ todo, onClose }: { todo?: Todo, onClose?: () => void }) => {
  const [value, setValue] = useState(today(getLocalTimeZone()));
  const [tags, setTags] = useState<Tag[]>([]);
  const ref = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<Todo>({
    title: '',
    description: '',
    dueDate: null,
    tag: '',
    isCompleted: false
  });
  const router = useRouter();
  const pathname = usePathname();
  const updateTodo = editTodo.bind(null, todo?._id!);
  const EDITMODE = useMemo(() => pathname === `/todos/${todo?._id}`, [pathname, todo]);

  const fetchTags = useCallback( async() => {
    const data = await getTags()
    setTags(data);
  }, []);

  useEffect(() => {
    const initializeForm = async () => {
      if (EDITMODE && todo) {
        console.log(todo)
        setFormData({ ...todo });
        setValue(parseDate(todo.dueDate!));
      }
      fetchTags()
    };
    initializeForm();
  }, [EDITMODE, fetchTags, todo]);


  useEffect(() => {
    const { day, month, year } = value;
    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    setFormData(prevState => ({
      ...prevState,
      dueDate: formattedDate
    }));
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const resetTodoHandler = async() => {
    if(EDITMODE) {
      if (confirm("Are you sure you want to delete this todo?") == true) {
        await deleteTodo(todo?._id!)
        router.push('/todos')
      }
    }else {
      router.push('/todos')
    }
  }

  return (
    <form 
    ref={ref} 
    action={async (formData: FormData) => {
      if (EDITMODE) {
        await updateTodo(formData);
      } else {
        await createTodo(formData);
      }
      // Handle any post-submission logic here
      router.push('/todos');
    }} 
    className='bg-content1 sticky top-0 w-full max-w-96 m-2 p-2 rounded-md max-h-[700px] flex flex-col justify-between'
    >
      <div className="space-y-4">
        <h1 className='capitalize text-xl font-semibold'> {EDITMODE ? 'Edit Todo:' : 'Create todo:'} </h1>
        <Input
          type="text"
          variant='flat'
          required
          name="title"
          className='mb-6'
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter your title"
        />
        <Textarea
          variant='flat'
          name="description"
          labelPlacement="outside"
          placeholder="Enter your description"
          onChange={handleChange}
          value={formData.description}
          className="col-span-12 md:col-span-6 mb-6 md:mb-0"
        />
        <Select
          labelPlacement='outside-left'
          label="Tag"
          placeholder="Select tag"
          name='tag' 
          className='flex items-center'
          selectedKeys={[formData.tag!]}
          onChange={handleChange}
        >
          {tags.map(tag => (
            <SelectItem key={tag._id!} value={tag._id}>
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
      <div className='flex justify-end gap-x-2 mt-4 lg:mt-0 lg:justify-between'>
        <Button 
        type="button" 
        color="default" 
        onClick={resetTodoHandler}
        >
          {EDITMODE ? 'Delete Todo' : 'Cancel'}
        </Button>
        <Button 
          type='submit' 
          className='bg-blue-600 text-white'
        >
          { EDITMODE ? 'Save Todo' : 'Add Todo' }
        </Button>
      </div>
    </form>
  );
};

export default TodoForm;