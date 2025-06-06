import React, { ReactNode } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";


type variant = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full" | undefined

interface ModalProp { 
  children: ReactNode, 
  onClose: () => void, 
  isOpen: boolean, 
  title: string, 
  size: variant 
}

export default function App({children, isOpen, onClose, title, size = "xs" } : ModalProp) {

  return (
    <>
      <Modal 
        size={size} 
        isOpen={isOpen} 
        onClose={onClose}
        className="z-50 font-mono" 
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody className="px-2">
                {children}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
