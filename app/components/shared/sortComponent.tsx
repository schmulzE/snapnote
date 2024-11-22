import React, { Dispatch, SetStateAction, useState } from 'react';
import { Listbox, ListboxSection, ListboxItem } from "@nextui-org/listbox";
import ListboxWrapper from '@/app/components/ui/listBoxWrapper';
import { Note } from '@/models/note';
import { Folder } from '@/models/folder';


interface SortProp {
  setSortAlphabetically: Dispatch<SetStateAction<boolean>>;
  setSortByDate: Dispatch<SetStateAction<boolean>>;
  setState: Dispatch<SetStateAction<Note[] | Folder[]>> | undefined
}

function SortComponent({setState, setSortAlphabetically, setSortByDate} : SortProp) {
  const [selectedKeys, setSelectedKeys] = React.useState<any>(new Set([]));

  return (
    <ListboxWrapper>
      <Listbox 
      aria-label="Actions"
      selectionMode="multiple"
      selectedKeys={selectedKeys}
      onSelectionChange={setSelectedKeys}
      >
        <ListboxItem key="alphabetically" onPress={() => setSortAlphabetically(prevState => !prevState)}>Sort Alphabetically </ListboxItem>
        <ListboxItem 
        onPress={() => setSortByDate(prevState => !prevState)} 
        key="date"
        >
          Sort by date
        </ListboxItem>
      </Listbox>
    </ListboxWrapper>
  );
}

export default SortComponent;