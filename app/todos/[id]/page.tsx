import React from 'react'
import TodoList from '@/app/components/todos/todoList'
import TodoForm from '@/app/components/todos/todoForm';
import { connectMongoDB } from '@/lib/mongodb';
import TodoModel, { Todo } from '@/models/todo';

const Page = async({ params } : { params : { id : string }}) => {
  await connectMongoDB()
  const data =  await TodoModel.find({});
  const res =  await TodoModel.findOne({  _id: params.id });
  const todos = JSON.parse(JSON.stringify(data)) as Todo[];
  const todo = JSON.parse(JSON.stringify(res)) as Todo;

  return (
    <div className='flex gap-x-4 w-full'>
      <div className='flex-1'>
        <TodoList todos={todos}/>
      </div>
      <TodoForm todo={todo}/>
    </div>
  )
}

export default Page;