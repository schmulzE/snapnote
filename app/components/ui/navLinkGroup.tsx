"use client"

import React, { ReactElement } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { Button } from '@nextui-org/button'

interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  icon?: ReactElement
  text: string
  to: string
}

const NavLink: React.FC<NavLinkProps> = ({ icon, text, to, ...rest }) => {
  const pathname = usePathname()
  const isActive = pathname === to
  const isLogout = text.toLowerCase() === "logout"

  const commonClasses = "flex items-center gap-2 p-2 w-full text-left transition-colors duration-200 rounded-md hover:bg-content2 hover:text-accent-foreground"
  const activeClasses = isActive ? "bg-content2 text-accent-foreground" : "text-foreground"

  const handleLogout = () => signOut({ redirect: true, callbackUrl: "/login" })

  if (isLogout) {
    return (
      <Button
        variant="ghost"
        className={`${commonClasses} justify-start border-none`}
        onClick={handleLogout}
      >
        {icon}
        <span>{text}</span>
      </Button>
    )
  }

  return (
    <Link
      href={to}
      className={`${commonClasses} ${activeClasses}`}
      {...rest}
    >
      {icon}
      <span>{text}</span>
    </Link>
  )
}

interface NavLinkGroupProps {
  children: ReactElement<NavLinkProps> | ReactElement<NavLinkProps>[]
  className?: string
}

const NavLinkGroup: React.FC<NavLinkGroupProps> = ({ children, className }) => {
  return (
    <nav className={`space-y-1 ${className}`}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === NavLink) {
          return React.cloneElement(child)
        }
        return child
      })}
    </nav>
  )
}

export { NavLink, NavLinkGroup }