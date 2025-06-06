import React, { ReactNode } from 'react';
import Sidebar from '../components/shared/sidebar';
import { ThemeProvider } from 'next-themes';
import { SidebarProvider } from '../sidebarProvider';
import { connectMongoDB } from '@/lib/mongodb';
import Tag from '@/models/tag';

const Layout = async({children} : {children : ReactNode}) => {

  await connectMongoDB();
  const tags = await Tag.find()

  return (
    <SidebarProvider>
      <div className='flex h-screen w-full z-50 overflow-hidden font-mono'>
        <Sidebar tags={JSON.parse(JSON.stringify(tags))}/>
        <div className='w-full px-4 overflow-auto'>
        <ThemeProvider>
          {children}
        </ThemeProvider>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default Layout