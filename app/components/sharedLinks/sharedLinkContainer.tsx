"use client"

import React, { useReducer } from "react";
import Table from "../ui/table";
import Modal from "../ui/modal";
import { Button, Tooltip } from "@nextui-org/react";
import { SharedLink } from "@/models/sharedLink";
import { deleteShareLink } from "@/actions/sharedLinks";
import { initialState, modalReducer } from '@/app/reducers/modalReducer';


const columns = [
  {name: "NAME", uid: "name"},
  {name: "DATE SHARED", uid: "date shared"},
  {name: "ACTIONS", uid: "actions"},
];

const readableDate = (isoDate: string) => {
  // Create a Date object from the ISO 8601 string
  const date = new Date(isoDate);

  // Get the day, month, and year from the date object
  const day = date.getUTCDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getUTCFullYear();

  // Format the date into the desired string format
  return `${day} ${month} ${year}`;
}

export default function App({sharedLinks}: {sharedLinks: SharedLink[]}) {
  const [state, dispatch] = useReducer(modalReducer, initialState);

  const renderCell = React.useCallback((link: SharedLink, columnKey: React.Key) => {
    const cellValue = link[columnKey as keyof SharedLink];

    switch (columnKey) {
      case "name":
        return (
          <a href={link.url} target="_blank">
            <i className="ri-link"/>
            {link.url}
          </a>
        );
      case "date shared":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{readableDate(link.createdAt!)}</p>
          </div>
        );
      case "actions":
        return (
          <div className="relative flex items-center content-center justify-center gap-2">
            <Tooltip color="danger" content="Delete link">
              <span onClick={() => deleteShareLink(link._id!)} className="text-lg text-danger cursor-pointer active:opacity-50">
                <i className="ri-delete-bin-7-line" />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const openModal = (title: string, content: React.ReactNode) => {
    dispatch({ type: 'OPEN_MODAL', title, content });
  };

  const closeModal = () => {
    dispatch({ type: 'CLOSE_MODAL' });
  };

  return (
    <>
      <div className='flex justify-between items-center'>
        <div>Shared links</div>
        <Button 
        onClick={() => openModal('Shared Links', 
          <Table columns={columns} renderCell={renderCell} links={sharedLinks}/>
        )}
        >
          Manage
        </Button>
      </div>
      <Modal isOpen={state.isOpen} onClose={closeModal} title={state.title} size={'3xl'}>
        {state.content}
      </Modal>
    </>
  );
}
