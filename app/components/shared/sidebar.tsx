'use client'
import React from 'react';
import {Tag } from '@/models/tag';
import Tags from '../tags/tags';
import SearchInput from './searchInput';
import { Button } from '@nextui-org/react';
import { NavLinkGroup, NavLink } from '../ui/navLinkGroup';
import { useSidebar } from '@/app/sidebarProvider';

const Sidebar =  ({ tags }: { tags: Tag[]}) => {
  const { isMobile, isOpen, toggleSidebar } = useSidebar()

  const sidebarContent = (
    <div 
    className='overflow-y-auto h-full [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500'
    >
      <div className='space-y-8 lg:space-y-4 w-full'>
        <div className='flex items-center justify-between'>
          <h1 className='text-xl font-medium'>Menu</h1>
          <Button isIconOnly className='bg-transparent hidden lg:block'>
            <i className='ri-menu-fill text-xl'></i>
          </Button>
        </div>

        {!isMobile && <SearchInput/>}

        <NavLinkGroup className="space-y-2 flex-col flex">
          <NavLink to="/notes" icon={<i className="ri-file-3-line text-xl"></i>} text="Notes" />
          <NavLink to="/todos" icon={<i className="ri-list-unordered text-xl"></i>} text="Todos" />
          <NavLink to="/folders" icon={<i className="ri-folders-line text-xl"></i>} text="Folders" />
          <NavLink to="/favourites" icon={<i className="ri-star-line text-xl"></i>} text="Favourites" />
        </NavLinkGroup>

        <Tags tags={tags }/>
      </div>

      <NavLinkGroup className="flex flex-col text-md gap-y-2 mb-2">
        <NavLink to={''} icon={<i className="ri-logout-box-r-line text-xl"></i>} text="Logout" />
        <NavLink to="/settings" icon={<i className="ri-settings-3-line text-xl"></i>} text="Settings" />
      </NavLinkGroup>
    </div>
  )

if (isMobile) {
  return isOpen ? (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm w-full" onClick={toggleSidebar}>
      <div className="fixed left-0 top-0 h-full w-64 max-w-xs bg-background flex flex-col justify-between p-4">
        {sidebarContent}
      </div>
    </div>
  ) : null
}

return (
  <div className='hidden md:flex md:flex-col justify-between px-2 capitalize sticky top-0 w-96 pt-2 m-2 rounded-md z-50 text-sm bg-content1' >
    {sidebarContent}
  </div>
)
}

export default Sidebar