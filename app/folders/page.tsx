import React from 'react';
import Folders from '../(components)/folders';

async function getfolders() {
  try {
    const res = await fetch(`http://localhost:3000/api/folders`,  {
      cache: "no-store",
    });
   
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
   
    return res.json()
    
  } catch (error) {
    console.log(error)
  }
}

const page = async() => {
  const data = await getfolders()
  const folders = data.folders

  return (
    <div>
      <Folders folders={folders}/>
    </div>
  )
}

export default page