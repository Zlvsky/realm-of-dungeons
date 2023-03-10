import React from "react";

interface HeaderInterface {
  children: React.ReactNode;
}

function Header({ children }: HeaderInterface) {
  return (
    <h1 className="text-2xl md:text-4xl p-2 font-semibold font-sans bg-gradient-to-b from-primary to-primaryLight text-transparent bg-clip-text">
      {children}
    </h1>
  );
}

export default Header;
