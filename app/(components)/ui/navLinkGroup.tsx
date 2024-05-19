"use client"

import React, { ReactElement } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { Button } from '@nextui-org/button';


interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  icon?: ReactElement;
  text: string;
  to: string;
}

export const NavLink: React.FC<NavLinkProps> = ({ icon, text, to, ...rest }) => {
  const pathname = usePathname()

  return (
    <>
    {text == "Logout" ?(
    <Button className='bg-transparent text-left flex justify-start items-center p-1' onClick={() => signOut({ redirect: false, callbackUrl: "/login"})}>
        {icon && <span className="mr-2">{icon}</span>}
        <span>{text}</span>
      </Button>) : (
        <Link
          href={to}
          className={`items-center flex gap-x-2 p-1 ${pathname === to ? 'bg-gray-200 rounded' : ''}`}
          {...rest}
        >
          {icon && <span className="mr-2">{icon}</span>}
          <span>{text}</span>
        </Link>
      )}
    </>
  );
};

interface NavLinkGroupProps {
  children: ReactElement<NavLinkProps> | ReactElement<NavLinkProps>[];
  className?: string;
}

const NavLinkGroup: React.FC<NavLinkGroupProps> = ({ children, className }) => {
  return (
    <nav className={className}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === NavLink) {
          return React.cloneElement(child, { className: 'group' });
        }
        return child;
      })}
    </nav>
  );
};

export default NavLinkGroup;