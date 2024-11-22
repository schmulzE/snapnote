"use client"

import React from 'react';
import Link, { LinkProps } from 'next/link';

interface LinkButtonProps extends LinkProps {
  href: string;
  text: string;
  icon: string;
  // className: string;
}

const LinkButton: React.FC<LinkButtonProps> = ({ href, text, icon, ...otherProps }) => {
  return (
    <Link {...otherProps} href={href} className='capitalize border-y-1 w-full py-2 flex items-center'>
      <i className={`${icon} text-xl text-gray-500`}></i>
      <span className='text-md'>{text}</span>
    </Link>
  );
};

export default LinkButton;
