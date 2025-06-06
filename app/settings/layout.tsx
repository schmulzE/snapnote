import Tag from '@/models/tag';
import React, { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';
import { connectMongoDB } from '@/lib/mongodb';
import Sidebar from '../components/shared/sidebar';
import { SidebarProvider } from '../sidebarProvider';


const Layout = async({children} : {children : ReactNode}) => {

  await connectMongoDB();
  const tags = await Tag.find();
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
