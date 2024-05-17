"use client"

import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react';
import React from 'react';

const Breadcrumb = ({folderName} : { folderName : string}) => {
  return (
    <>
     <Breadcrumbs>
      <BreadcrumbItem startContent={<i className="ri-folder-line"/>} endContent={<i className="ri-arrow-right-s-line"></i>}>
        <span>{folderName}</span>
      </BreadcrumbItem>
      </Breadcrumbs>
    </>
  )
}

export default Breadcrumb
