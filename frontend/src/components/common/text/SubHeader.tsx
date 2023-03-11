import React from "react";

interface HeaderInterface {
  children: React.ReactNode;
}

function SubHeader({ children }: HeaderInterface) {
  return (
    <h1 className="text-lg p-2 font-semibold font-sans bg-gradient-to-b from-primary to-primaryLight text-transparent bg-clip-text">
      {children}
    </h1>
  );
}

export default SubHeader;
