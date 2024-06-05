"use client"

import { Input } from '@nextui-org/react';
import React, { useState } from 'react'
import { useRouter } from "next/navigation";


const SearchInput = () => {
  const [ searchTerm, setSearchTerm ] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSearchTerm("");
    router.push(`/search/${searchTerm}`);
    console.log('Search term:', searchTerm);
  };

  
  return (
    <form onSubmit={handleSubmit}>
      <Input
        size="sm"
        placeholder='search'
        type="text"
        className="w-full bg-gray-100"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        startContent={
          <i className="ri-search-line text-xl"/>
        }
      />
    </form>
  )
}

export default SearchInput
