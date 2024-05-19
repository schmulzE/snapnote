import React from 'react';
import { Button, Input } from '@nextui-org/react';
import Tags from './tags';
import NavLinkGroup, { NavLink } from './ui/navLinkGroup';

const Sidebar = () => {

  return (
    <div className='flex flex-col justify-between px-2 capitalize sticky top-0 w-96 pt-2 m-2 rounded-md z-50 text-sm bg-gray-100'>
      <div className='space-y-4 w-full'>
        <div className='flex items-center justify-between'>
          <h1 className='text-xl font-medium'>Menu</h1>
          <Button isIconOnly className='bg-transparent'>
            <i className='ri-menu-fill text-xl'></i>
          </Button>
        </div>

        <Input
          size="sm"
          placeholder='search'
          type="text"
          className="w-full"
          startContent={
            <i className="ri-search-line text-xl"/>
          }
        />
        <NavLinkGroup className="space-y-2 flex-col flex">
          <NavLink to="/notes" icon={<i className="ri-file-3-line text-xl"></i>} text="Notes" />
          <NavLink to="/todos" icon={<i className="ri-list-unordered text-xl"></i>} text="Todos" />
          <NavLink to="/folders" icon={<i className="ri-folders-line text-xl"></i>} text="Folders" />
          <NavLink to="/favourites" icon={<i className="ri-star-line text-xl"></i>} text="Favourites" />
        </NavLinkGroup>

        <Tags/>
      </div>

      <NavLinkGroup className="flex flex-col text-md">
        <NavLink to={''} icon={<i className="ri-logout-box-r-line text-xl"></i>} text="Logout" />
        <NavLink to="/settings" icon={<i className="ri-settings-3-line text-xl"></i>} text="Settings" />
      </NavLinkGroup>
    </div>
  )
}

export default Sidebar
