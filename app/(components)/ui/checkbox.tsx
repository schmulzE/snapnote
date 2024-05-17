import React from "react";
import {Checkbox} from "@nextui-org/react";

export default function App({children} : {children : React.ReactNode}) {
  return (
    <Checkbox defaultSelected lineThrough>{children}</Checkbox>
  );
}
