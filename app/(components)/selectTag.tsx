import React, { FormEvent, useState } from 'react';
import { Button, RadioGroup, Radio, cn, RadioProps } from "@nextui-org/react";
import generateColorFromText from '@/utils/generateColorFromText';

interface Tag {
  _id: string;
  name: string;
};

interface CustomRadioProps extends RadioProps {
  children: React.ReactNode;
}


export const CustomRadio = ( { children, ...otherProps }: CustomRadioProps ) => {

  return (
    <Radio
      {...otherProps}
      classNames={{
        base: cn(
          "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
          "flex-row-reverse max-w-[300px] cursor-pointer rounded-lg gap-4 p-2 border-2 border-transparent",
          "data-[selected=true]:border-primary capitalize"
        ),
      }}
    >
      {children}
    </Radio>
  );
};


const TagForm = ({tags, onClose, text, tagId} : { tags: Tag[], onClose: () => void, text: string, tagId?: string}) => {
  const [formData, setFormData] = useState<any>({ tag: ''});
  

  const handleChange = (event: { target: { value: string; }; }) => {
    const value = event.target.value;
    setFormData({ tag: value })
  }

  const handleSubmit = async (e : FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3000/api/${text}`, {
        method: 'PUT',
        body: JSON.stringify({ formData })
      });
     
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }

      onClose();

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <RadioGroup>
        {tags.map(tag => (
          <CustomRadio key={tag._id} value={tag._id} checked={tagId == tag._id} onChange={handleChange}>
            <i style={{ color: generateColorFromText(tag.name) }} className='ri-bookmark-fill text-xl inline-block mr-2'></i>
            {tag.name} 
          </CustomRadio>
        ))}
      </RadioGroup>

      <div className='flex justify-end w-full mt-2 px-2 gap-2'>
        <Button variant='bordered' type='button' color='danger' onClick={onClose}>Cancel</Button>
        <Button type='submit'  color='success'>Submit</Button>
      </div>
    </form>
  )
}

export default TagForm
