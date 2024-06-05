import React from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";

interface MenuItemProps{
 key: string;
 event: (folderId: string) => void;
 text: string;

}


type Variant =  "faded" | "solid" | "bordered" | "light" | "flat" | "shadow" | "ghost" | undefined;


interface ComponentProps {
  menuItems: MenuItemProps[];
  variant: Variant;
  isIconOnly: boolean;
  buttonText: string;
  buttonIcon: React.ReactNode;
  buttonClass: string;
  folderId: string
}



const App: React.FC<ComponentProps> = ({variant, isIconOnly, buttonText, menuItems, buttonIcon, buttonClass, folderId}) => {

  const handleMenuItemClick = (folderId: string, event: (folderId: string) => void) => {
    event(folderId);
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
        {menuItems.map(item => (
          <DropdownItem 
          className={item.key === 'delete' ? 'text-danger' : ''} 
          color={item.key === 'delete' ? 'danger' : undefined} 
          onClick={() => handleMenuItemClick(folderId, item.event)} 
          key={item.key}>
            {item.text}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}


export default App