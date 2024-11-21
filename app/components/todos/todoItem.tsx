"use client"
import React from 'react';
import { Checkbox } from "@nextui-org/react";
import LinkButton from '../ui/linkButton';
import { Todo } from '@/models/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string, completed: boolean) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle }) => {
  const handleToggle = () => {
    onToggle(todo._id!, !todo.isCompleted!);
  };

  return (
    <li className='text-left cursor-pointer rounded-md w-full py-2 flex justify-between items-center'>
      <Checkbox
        onChange={handleToggle}
        isSelected={todo.isCompleted}
        lineThrough={todo.isCompleted}
        className='capitalize'
      >
        {todo.title}
      </Checkbox>
      <LinkButton href={`/todos/${todo._id}`} icon='ri-arrow-right-s-line text-black' text={''} />
    </li>
  );
};

export default TodoItem;
