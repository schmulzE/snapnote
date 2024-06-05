import React, { Dispatch, SetStateAction } from 'react';
import { Listbox, ListboxItem } from "@nextui-org/listbox";
import ListboxWrapper from '@/app/(components)/listBoxWrapper';

interface Note {
  _id?: string;
  title?: string;
  content?: string;
  createdBy?: string | undefined;
  folder?: string | undefined;
  favourite?: boolean;
  createdAt?: string;
  tag?: string;
}

interface Folder {
  name: string;
  createdBy?: string | undefined;
  tag?: string;
  favourite?: string;
  createdAt: string
}

function FilterComponent({setState} : {setState: Dispatch<SetStateAction<Note[] | Folder[]>> | undefined}) {

  const FilterByTag = () => {
    setState!((state) => {
      if (Array.isArray(state) && state.every((item) => 'name' in item)) {
        // state is an array of Folder objects
        return state.filter((folder) => folder.tag);
      } else {
        // state is an array of Note objects
        return state.filter((note) => note.tag);
      }
    });
  };

  const FilterByFavourite = () => {
    setState!((state) => {
      if (Array.isArray(state) && state.every((item) => 'name' in item)) {
        // state is an array of Folder objects
        return state.filter((folder) => folder.favourite);
      } else {
        // state is an array of Note objects
        return state.filter((note) => note.favourite);
      }
    });
  };
  

  return (
    <ListboxWrapper>
      <Listbox aria-label="Actions">
        <ListboxItem key="tag" onPress={FilterByTag}>Filter by tag</ListboxItem>
        <ListboxItem onPress={FilterByFavourite} key="favourite" >Filter by Favourite</ListboxItem>
      </Listbox>
    </ListboxWrapper>
  );
}

export default FilterComponent;