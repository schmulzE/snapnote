import { usePathname } from "next/navigation";
import React, { Dispatch, SetStateAction } from 'react';
import { Listbox, ListboxItem } from "@nextui-org/listbox";
import ListboxWrapper from '@/app/components/ui/listBoxWrapper';

interface filterProp {
  setFilterByFavorite: Dispatch<SetStateAction<boolean>> | undefined;
  setFilterByNoTag: Dispatch<SetStateAction<boolean>> | undefined;
}


function FilterComponent({ setFilterByFavorite, setFilterByNoTag } : filterProp) {
  const [selectedKeys, setSelectedKeys] = React.useState<any>(new Set([]));
  const pathname = usePathname();

  return (
    <ListboxWrapper>
      <Listbox 
      aria-label="Actions"
      selectionMode="multiple"
      selectedKeys={selectedKeys}
      onSelectionChange={setSelectedKeys}
      className="font-mono"
      >
        <ListboxItem 
        key="tag" 
        onPress={() => setFilterByNoTag!((prevState) => !prevState)}
        >
          Filter by tag
        </ListboxItem>
        <ListboxItem 
        onPress={() => setFilterByFavorite!((prevState) => !prevState)} 
        key="favourite" 
        isReadOnly={pathname === '/favourites'}
        >
          Filter by Favourite
        </ListboxItem>
      </Listbox>
    </ListboxWrapper>
  );
}

export default FilterComponent;