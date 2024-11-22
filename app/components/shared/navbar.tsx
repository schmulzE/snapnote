'use client'

import React from 'react'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button
} from "@nextui-org/react"
import Image from 'next/image';
import { usePathname } from 'next/navigation'
import logo from '@/public/logo-black.svg';


const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Features', href: '/#features' },
  { name: 'Pricing', href: '/#pricing' },
  { name: 'Testimonials', href: '/#testimonials' },
]

export default function AppNavbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const pathname = usePathname()

  return (
    <Navbar 
      onMenuOpenChange={setIsMenuOpen}
      shouldHideOnScroll
      isBordered
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden w-full max-w-sm md:max-w-5xl md:mx-auto lg:mx-auto"
        />
        <NavbarBrand>
				<Link href="/" className='flex items-center w-44'>
					<Image src={logo} alt={'snapnote logo'} width={100} className='w-[100px] md:w-[150px] lg:w-[150px]'/>			
				</Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {navItems.map((item) => (
          <NavbarItem key={item.name} isActive={pathname === item.href}>
            <Link
              color={pathname === item.href ? "primary" : "foreground"}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      
      <NavbarContent justify="end">
        <NavbarItem className="hidden sm:flex">
          <Link href="/login" color="foreground">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="/register" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
      
      <NavbarMenu>
        {navItems.map((item, index) => (
          <NavbarMenuItem key={`${item.name}-${index}`}>
            <Link
              color={pathname === item.href ? "primary" : "foreground"}
              className="w-full"
              href={item.href}
              size="lg"
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
        <NavbarMenuItem>
          <Link
            color="foreground"
            className="w-full"
            href="/login"
            size="lg"
          >
            Login
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  )
}

// import React from 'react';
// import logo from '@/public/logo-black.svg';
// import Image from 'next/image';
// import Link from 'next/link';

// const navbar = () => {
//   return (
//     <header className="z-10">
// 			<nav className="navbar bg-transparent flex items-center justify-between max-w-sm md:max-w-5xl  mx-auto pt-4 md:px-8">
// 				<Link href="/" className='flex items-center w-44'>
// 					<Image src={logo} alt={'snapnote logo'} width={100}/>
// 				</Link>
// 				<ul className="hidden md:flex gap-x-4">
// 					<li className="hover:tracking-widest transition-all duration-400"><Link href="#features" className="underline-none hover:underline-offset-8 hover:underline font-medium text-sm text-slate-800">Features</Link></li>
// 					<li className="hover:tracking-widest transition-all duration-400"><Link href="#testimonials" className="underline-none hover:underline-offset-8 hover:underline font-medium text-sm text-slate-800">Testimonial</Link></li>
// 					<li className="hover:tracking-widest transition-all duration-400"><Link href="#pricing" className="underline-none hover:underline-offset-8 hover:underline font-medium text-sm text-slate-800">Pricing</Link></li>
// 				</ul>
// 				<div className="hidden btn-group text-sm font-medium">
// 					<Link className="px-4 py-3 bg-transparent rounded-xl hover:bg-gray-100 hover:tracking-widest transition-all duration-400" href={'/login'}>Login</Link>
// 					<Link className="px-4 py-3 bg-transparent rounded-xl hover:shadow-lg hover:tracking-widest text-gray-900 hover:bg-gray-900 uppercase hover:text-white transition-all duration-400" href={'/signup'}>sign up</Link>
// 				</div>
// 				<button><i className='ri-menu-fill text-xl'></i></button>
// 			</nav>
//     </header>
//   )
// }

// export default navbar
