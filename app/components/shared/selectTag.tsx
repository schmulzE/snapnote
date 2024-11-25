import React, { useState } from 'react';
import { Tag } from '@/models/tag';
import { selectNoteTag } from '@/actions/notes';
import generateColorFromText from '@/utils/generateColorFromText';
import { Button, RadioGroup, Radio, cn, RadioProps } from "@nextui-org/react";

interface CustomRadioProps extends RadioProps {
  children: React.ReactNode;
}

export const CustomRadio = ({ children, ...otherProps }: CustomRadioProps) => {
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

const SelectTag = ({ tags, onClose, text, tagId, id }: { tags: Tag[], onClose: () => void, text: string, tagId?: string, id: string }) => {
  const [selectedTag, setSelectedTag] = useState<string | undefined>(tagId);

  const handleChange = (value: string) => {
    setSelectedTag(value);
  }

  const handleSubmit = async (formData: FormData) => {
    if (!selectedTag) return;

    formData.append('tag', selectedTag);
    await selectNoteTag(id, formData);
  }

  return (
    <form action={handleSubmit} className='w-full'>
      <RadioGroup 
        className='w-full' 
        value={selectedTag} 
        onValueChange={handleChange}
      >
        {tags.map(tag => (
          <CustomRadio 
            key={tag._id} 
            className='w-full max-w-7xl' 
            value={tag._id as string}
          >
            <i 
              style={{ color: generateColorFromText(tag.name) }} 
              className='ri-bookmark-fill text-xl inline-block mr-2'
            ></i>
            {tag.name} 
          </CustomRadio>
        ))}
      </RadioGroup>

      <div className='flex justify-end w-full mt-2 px-2 gap-2'>
        <Button variant='bordered' type='button' color='default' onClick={onClose}>
          Cancel
        </Button>
        <Button 
          type='submit' 
          className='bg-blue-500 text-white' 
          isDisabled={!selectedTag}
        >
          Submit
        </Button>
      </div>
    </form>
  )
}

export default SelectTag