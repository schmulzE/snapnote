import React, { ReactNode } from "react";

const ListboxWrapper = ({children} : {children : ReactNode}) => (
  <div className="w-full max-w-[260px] rounded-small dark:border-default-100">
    {children}
  </div>
);

export default ListboxWrapper;