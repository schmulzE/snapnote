import React, { Dispatch, SetStateAction, useState } from 'react';
import { Listbox, ListboxSection, ListboxItem } from "@nextui-org/listbox";
import ListboxWrapper from '@/app/(components)/listBoxWrapper';

interface Note {
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

function SortComponent({setState} : {setState: Dispatch<SetStateAction<Note[] | Folder[]>> | undefined}) {

  const sortAlphabetically = () => {
    setState!((state) => {
      if (Array.isArray(state) && state.every((item) => 'name' in item)) {
        // state is an array of Folder objects
        return [...state].sort((a, b) => a.name!.localeCompare(b.name!));
      } else {
        // state is an array of Note objects
        return [...state].sort((a, b) => a.title!.localeCompare(b.title!));
      }
    });

  }

  const sortByDate = () => {
    setState!((state) => {
      if (Array.isArray(state) && state.every((item) => 'name' in item)) {
        // state is an array of Folder objects
        return [...state].sort((a, b) => new Date(a.createdAt!).getTime() - new Date(b.createdAt!).getTime());
      } else {
        // state is an array of Note objects
        return [...state].sort((a, b) => new Date(a.createdAt!).getTime() - new Date(b.createdAt!).getTime());
      }
    });
  }

  return (
    <ListboxWrapper>
      <Listbox aria-label="Actions">
        <ListboxItem key="alphabetically" onPress={sortAlphabetically}>Sort Alphabetically </ListboxItem>
        <ListboxItem onPress={sortByDate} key="date">Sort by date</ListboxItem>
      </Listbox>
    </ListboxWrapper>
  );
}

export default SortComponent;