// "use client"

// import React, { ReactNode } from 'react';
// import { Input } from '@nextui-org/react';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';

// const NoteLayout = ({children} : {children : ReactNode}) => {
//   const pathname = usePathname()
//   return (
//     <div className=' h-screen overflow-hidden'>
//       <div className='border-b'>
//         <div className='flex max-w-sm justify-between p-2 items-center gap-x-2'>
//           <p>tab</p>
//           <Input
//             size="sm"
//             placeholder='search'
//             type="text"
//             className=" w-48"
//             startContent={
//               <i className="ri-search-line text-xl"/>
//             }
//           />
//           <div className='flex items-center gap-3'>
//             <i className="ri-folder-add-line"></i>
//             <i className="ri-archive-line"></i>
//             <i className="ri-delete-bin-7-line"></i>
//           </div>
//           </div>
//       </div>
//       <div className='flex h-screen w-full'>
//         <div className='border-r flex flex-col justify-between items-center sticky top-0 w-16 pt-2 pb-14'>
//           <div className='space-y-4 flex-col flex'>
//           <Link href="/notes" className={`link p-1 ${pathname === '/notes' || pathname === `/notes/:id` ? 'bg-gray-200 rounded' : ''}`}>
//             <i className="ri-file-3-line text-xl"></i>
//           </Link>
//           <Link href="/todos" className={`link p-1 ${pathname === '/todo' ? 'bg-gray-200 rounded' : ''}`}>
//             <i className="ri-list-unordered text-xl"></i>
//           </Link>
//           <Link href="/folders" className={`link p-1 ${pathname === '/folder' ? 'bg-gray-200 rounded' : ''}`}>
//             <i className="ri-folders-line text-xl"></i>
//           </Link>
//           <Link href="/favourites" className={`link p-1 ${pathname === '/favourites' ? 'bg-gray-200 rounded' : ''}`}>
//           <i className="ri-bookmark-line text-xl"></i>
//           </Link>
//           </div>
//           <div className='space-y-4 flex flex-col' >
//             <Link href="/faq" className={`link ${pathname === '/faq' ? 'bg-gray-200 p-1 rounded' : ''}`}>
//             <i className="ri-question-line text-2xl"></i>
//             </Link>
//             <Link href="/settings" className={`link ${pathname === '/settings' ? 'bg-gray-200 p-1 rounded' : ''}`}>
//               <i className="ri-settings-3-line text-2xl"></i>
//             </Link>
//           </div>
//         </div>
//         <div className='w-full'>
//         {children}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default NoteLayout

"use client"

import React, { ReactNode } from 'react';
import { Button, Input } from '@nextui-org/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Layout = ({children} : {children : ReactNode}) => {
  const pathname = usePathname()
  return (
    <div className='flex h-screen w-full z-50'>
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
          <div className='space-y-2 flex-col flex'>
            <Link href="/notes" className={`items-center flex gap-x-2 p-1 ${pathname === '/notes' || pathname === `/notes/:id` ? 'bg-gray-200 rounded' : ''}`}>
              <i className="ri-file-3-line text-xl"></i>
              <span>note</span>
            </Link>
            <Link href="/todos" className={`items-center flex gap-x-2 p-1 ${pathname === '/todos' ? 'bg-gray-200 rounded' : ''}`}>
              <i className="ri-list-unordered text-xl"></i>
              <>todos</>
            </Link>
            <Link href="/folders" className={`items-center flex gap-x-2 p-1 ${pathname === '/folders' ? 'bg-gray-200 rounded' : ''}`}>
              <i className="ri-folders-line text-xl"></i>
              <span>folders</span>
            </Link>
            <Link href="/favourites" className={`items-center flex gap-x-2 p-1 ${pathname === '/favourites' ? 'bg-gray-200 rounded' : ''}`}>
              <i className="ri-star-line text-xl"></i>
              <span>favourites</span>
            </Link>
          </div>

          <div className='space-y-2 flex flex-col'>
            <h3 className='uppercase font-medium'>tags</h3>
            <Link href='/tag/personal' className={`items-center flex gap-x-2 p-1 ${pathname === '/tags/personal' ? 'bg-gray-200 rounded' : ''}`}>
            <i className="ri-bookmark-fill text-red-500 text-xl"></i>
              <span>personal</span>
            </Link>
            <Link href={'/tags/work'} className={`items-center flex gap-x-2 p-1 ${pathname === '/tags/work' ? 'bg-gray-200 rounded' : ''}`}>
              <i className="ri-bookmark-fill text-blue-500 text-xl"></i>
              <span>work</span>
            </Link>
          </div>   
        </div>

        <div className='space-y-4 flex flex-col text-md'>
          <Link href="/faq" className={`link items-center flex gap-x-2 ${pathname === '/faq' ? 'bg-gray-200 p-1 rounded' : ''}`}>
            <i className="ri-logout-box-r-line text-xl"></i>
            <span>logout</span>
          </Link>
          <Link href="/settings" className={`link items-center flex gap-x-2 ${pathname === '/settings' ? 'bg-gray-200 p-1 rounded' : ''}`}>
            <i className="ri-settings-3-line text-xl"></i>
            <span>settings</span>
          </Link>
        </div>
      </div>
      <div className='w-full px-4'>
        {children}
      </div>
    </div>
  )
}

export default Layout
