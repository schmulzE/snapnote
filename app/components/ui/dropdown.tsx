"use client"

import React from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button,} from "@nextui-org/react";
import { usePathname } from 'next/navigation';
import { Tag } from "@/models/tag";
import TagItem from "../tags/tagItem";

interface MenuItemProps{
 key: string;
 event: (folderId: string) => void;
 text: string;
}


type Variant =  "faded" | "solid" | "bordered" | "light" | "flat" | "shadow" | "ghost" | undefined;


interface ComponentProps {
  menuItems?: MenuItemProps[];
  variant?: Variant;
  isIconOnly?: boolean;
  buttonText?: string | React.ReactNode;
  buttonIcon?: React.ReactNode;
  buttonClass?: string;
  id?: string;
  tags?: Tag[];
}



const App: React.FC<ComponentProps> = ({variant, isIconOnly, buttonText, menuItems, buttonIcon, buttonClass, id, tags}) => {
  const pathname = usePathname();

  const handleMenuItemClick = (id: string, event: (id: string) => void) => {
    event(id);
  };

  return (
    <Dropdown >
      <DropdownTrigger>
        <Button 
          variant={variant}
          isIconOnly={isIconOnly}
          className={buttonClass}
        >
          {buttonText || buttonIcon}
        </Button>
      </DropdownTrigger>
      <DropdownMenu variant="faded" aria-label="Static Actions">
        {tags ? tags.map((tag: Tag) => (
          <DropdownItem key={tag._id}>
            <TagItem tag={tag}/>
          </DropdownItem>
        )) : menuItems!.map(item => (
          <DropdownItem 
          className={item.key === 'delete' ? 'text-danger' : '' + ' flex justify-between'} 
          color={item.key === 'delete' ? 'danger' : undefined} 
          onClick={() => handleMenuItemClick(id!, item.event)} 
          key={item.key}>
            {item.text}
          </DropdownItem>
        ))}

        
      </DropdownMenu>
    </Dropdown>
  );
}


export default App