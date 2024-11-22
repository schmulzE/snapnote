"use client"
import React from 'react';
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";
import { SharedLink } from '@/models/sharedLink';

const App = ({columns, links, renderCell} : { columns: any[], links: any[], renderCell:  (link: SharedLink, columnKey: React.Key) => any }) => {
  return (
    <>
      {links.length > 0 ? (<Table aria-label="Example table with custom cells">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid} align={column.uid === "actions" ? "end" : "center"}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={links}>
          {(item) => (
            <TableRow key={item._id}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>) : <div className='p-4'>No data found!</div>}
    </>
  )
}

export default App
