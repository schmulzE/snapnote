import React, { ReactNode } from 'react';
import Sidebar from '../(components)/sidebar';


const Layout = ({children} : {children : ReactNode}) => {


  return (
    <div className='flex h-screen w-full z-50 overflow-hidden'>
      <Sidebar/>
      <div className='w-full px-4 overflow-auto'>
        {children}
      </div>
    </div>
  )
}

export default Layout
