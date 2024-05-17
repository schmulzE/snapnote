import React from 'react'
import Todos from '@/app/(components)/todos'
import TodoForm from '@/app/(components)/todo-form';

export const animals = [
  {label: "Cat", value: "cat", description: "The second most popular pet in the world"},
  {label: "Dog", value: "dog", description: "The most popular pet in the world"},
  {label: "Elephant", value: "elephant", description: "The largest land animal"},
  {label: "Lion", value: "lion", description: "The king of the jungle"},
  {label: "Tiger", value: "tiger", description: "The largest cat species"},
  {label: "Giraffe", value: "giraffe", description: "The tallest land animal"}
]

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

async function getSingleTodo(id: string) {
  try {
    const res = await fetch(`http://localhost:3000/api/todos/${id}`);
   
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
   
    return res.json()
    
  } catch (error) {
    console.log(error)
  }
}

const Page = async({ params } : { params : { id : string }}) => {
  const data = await getSingleTodo(params.id);
  const res = await getTodos();

  // if (!data?.todos) {
  //   return <p>No todo.</p>;
  // }

  const todos = res.todos;
  const todo = data.todo;



  return (
    <div className='flex gap-x-4 w-full'>
      <div className='flex-1'>
        <Todos todos={todos}/>
      </div>
      <TodoForm todo={todo}/>
    </div>
  )
}

export default Page
