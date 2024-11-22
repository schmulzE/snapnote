import React, { Dispatch, SetStateAction } from 'react';
import { Listbox, ListboxItem } from "@nextui-org/listbox";
import ListboxWrapper from '@/app/components/ui/listBoxWrapper';

interface Folder {
  _id?: string;
  name: string;
  createdBy?: string | undefined;
  tag?: string;
  favourite?: string;
  createdAt: string
}

interface filterProp {
  setFilterByFavorite: Dispatch<SetStateAction<boolean>> | undefined;
  setFilterByNoTag: Dispatch<SetStateAction<boolean>> | undefined;
  // setState: Dispatch<SetStateAction<Note[] | Folder[]>> | undefined;
}


function FilterComponent({ setFilterByFavorite, setFilterByNoTag } : filterProp) {
  const [selectedKeys, setSelectedKeys] = React.useState<any>(new Set([]));
  

  return (
    <ListboxWrapper>
      <Listbox 
      aria-label="Actions"
      selectionMode="multiple"
      selectedKeys={selectedKeys}
      onSelectionChange={setSelectedKeys}
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
        >
          Filter by Favourite
        </ListboxItem>
      </Listbox>
    </ListboxWrapper>
  );
}

export default FilterComponent;