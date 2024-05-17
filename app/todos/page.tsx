import React from 'react'
import Todos from '../(components)/todos'
import TodoForm from '../(components)/todo-form';

async function getTodos() {
  try {
    const res = await fetch(`http://localhost:3000/api/todos`,  {
      cache: "no-store",
    });
   
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
   
    return res.json()
    
  } catch (error) {
    console.log(error)
  }
}

const Page = async() => {
  const data = await getTodos();

  // if (!data?.todos) {
  //   return <p>No todo.</p>;
  // }

  const todos = data.todos;

  return (
    <div className='flex gap-x-4 w-full'>
      <div className='flex-1'>
        <Todos todos={todos}/>
      </div>
      <TodoForm/>
    </div>
  )
}

export default Page
