import React, { Suspense } from 'react';
import { Spinner } from '@nextui-org/react';
import { connectMongoDB } from '@/lib/mongodb';
import FolderModel, { Folder } from '@/models/folder';
import FolderView from '../components/folders/folderView';

const page = async() => {
  await connectMongoDB();
  const data = await FolderModel.aggregate([
    {
      $lookup: {
        from: 'notes',
        localField: '_id',
        foreignField: 'folder',
        as: 'notes',
      },
    },
    {
      $addFields: {
        totalNotes: { $size: '$notes' },
      },
    },
  ]);

  const folders = JSON.parse(JSON.stringify(data)) as Folder[];

  return (
    <div>
      <Suspense fallback={<div className='flex justify-center content-center'><Spinner label="Default" color="default" labelColor="foreground"/></div>}>
        <FolderView folders={folders}/>
      </Suspense>
    </div>
  )
}

export default page