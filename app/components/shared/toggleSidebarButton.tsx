'use client'

import React from 'react'
import { Button } from '@nextui-org/react'
import { useSidebar } from '@/app/sidebarProvider'

const ToggleSidebarButton = () => {
  const { toggleSidebar } = useSidebar()

  return (
    <>
      <Button onClick={toggleSidebar} isIconOnly className='bg-transparent block lg:hidden xl:hidden'>
        <i className='ri-menu-fill text-xl'></i>
      </Button> 
    </>
  )
}

export default ToggleSidebarButton