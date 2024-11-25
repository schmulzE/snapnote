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
  };

  
  return (
    <form onSubmit={handleSubmit}>
      <Input
        size="sm"
        placeholder='search notes...'
        type="text"
        className="w-full"
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
