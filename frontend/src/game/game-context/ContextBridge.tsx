import React from "react";

const ContextBridge = ({ children, Context, render }: any) => {
  return (
    <Context.Consumer>
      {(value: any) =>
        render(<Context.Provider value={value}>{children}</Context.Provider>)
      }
    </Context.Consumer>
  );
};

export default ContextBridge;
