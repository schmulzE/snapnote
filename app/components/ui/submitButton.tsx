"use client"
import { Button, ButtonProps } from '@nextui-org/react'
import React from 'react'
import { useFormStatus } from 'react-dom';

type colorVariant = "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;

interface CustomButtonProps extends ButtonProps {
  text: string, 
  color: colorVariant, 
  className: string 
}

const SubmitButton = ({text, ...otherProps} : CustomButtonProps) => {
  const { pending } = useFormStatus()

  return (
    <>
      <Button {...otherProps} type='submit' isLoading={pending} isDisabled={pending} >
        {text}
      </Button>
    </>
  )
}

export default SubmitButton
