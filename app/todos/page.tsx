import React from 'react';
import TodoList from '../components/todos/todoList';
import TodoForm from '../components/todos/todoForm';
import TodoModel, { Todo } from '@/models/todo';
import { connectMongoDB } from '@/lib/mongodb';

const Page = async() => {
  await connectMongoDB()
  const data = await TodoModel.find({});
  const todos = JSON.parse(JSON.stringify(data)) as Todo[];

  return (
    <div className='flex gap-x-4 w-full h-full'>
      <div className='w-full md:w-full lg:basis-3/5'>
        <TodoList todos={todos}/>
      </div>
      <div className='hidden md:hidden lg:flex basis-2/5 h-screen'>
        <TodoForm/>
      </div>
    </div>
  )
}

export default Page
