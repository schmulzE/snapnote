"use client"
import React from "react";
import {Popover, PopoverTrigger, PopoverContent, Button} from "@nextui-org/react";

export default function App({button, content} : {button: any, content: any}) {
  return (
    <Popover placement="bottom" showArrow={true}>
      <PopoverTrigger>
        {button}
      </PopoverTrigger>
      <PopoverContent>
        {content}
      </PopoverContent>
    </Popover>
  );
}
