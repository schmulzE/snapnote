"use client"

import Modal from '../ui/modal';
import TodoItem from './todoItem';
import TodoForm from './todoForm';
import { Todo } from '@/models/todo';
import LinkButton from '../ui/linkButton';
import { useRouter } from 'next/navigation';
import { toggleTodo } from '@/actions/todos';
import { useSidebar } from '@/app/sidebarProvider';
import React, { useState, useReducer } from 'react';
import { Button, Checkbox, Link } from "@nextui-org/react";
import { initialState, modalReducer } from '@/app/reducers/modalReducer';

interface TodosProps {
  todos: Todo[];
}

const Todos: React.FC<TodosProps> = ({ todos }) => {
  const [updatedTodos, setUpdatedTodos] = useState<Todo[]>(todos);
  const router = useRouter();
  const { toggleSidebar, isMobile } = useSidebar()
  const [state, dispatch] = useReducer(modalReducer, initialState);



  const handleToggle = async (id: string, completed: boolean) => {
    try {
      setUpdatedTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === id ? { ...todo, isCompleted: !completed } : todo
        )
      );
      await toggleTodo(id, !completed);
    } catch (error) {
      console.error(error);
    }

    router.refresh();
  };

  const openModal = (title: string, content: React.ReactNode) => {
    dispatch({ type: 'OPEN_MODAL', title, content });
  };

  const closeModal = () => {
    dispatch({ type: 'CLOSE_MODAL' });
  };

  return (
    <>
    <div className='w-full h-screen'>
      <div className='flex items-center my-2'>
        <Button onClick={toggleSidebar} isIconOnly className='bg-transparent block lg:hidden xl:hidden '>
          <i className='ri-menu-fill text-xl font-medium'></i>
        </Button>
        <h1 className='text-xl lg:text-4xl font-bold capitalize'>Todo</h1>
      </div>
      {/* <LinkButton href="/todos/create" text='add new todo' icon='ri-add-fill' /> */}
      <a
      className='border-y w-full p-2 my-2 block cursor-pointer'
      onClick={() => isMobile && openModal('Add new todo', <TodoForm onClose={closeModal}/>)} 
      >
        <i className='ri-add-fill'></i>
        Add new todo
      </a>
      <ul className='flex flex-wrap gap-2 w-full'>
        {updatedTodos.map((todo) => (
          <li key={todo._id} className='text-left cursor-pointer border-b-1 w-full py-2 flex justify-between items-center'>
            <Checkbox
              onChange={() => handleToggle(todo._id!, todo.isCompleted!)}
              isSelected={todo.isCompleted}
              lineThrough={todo.isCompleted}
              className='capitalize'
            >
              {todo.title}
            </Checkbox>
            <Link href={`/todos/${todo._id}`} className='block'>
              <i className='ri-arrow-right-s-line text-xl'></i>
            </Link>
          </li>
        ))}
      </ul>
    </div>
     <Modal isOpen={state.isOpen} onClose={closeModal} title={state.title} size={'sm'}>
      {state.content}
    </Modal>
   </>
  );
};

export default Todos;
