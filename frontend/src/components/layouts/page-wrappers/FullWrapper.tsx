import React from "react";
import patternBackground from "../../../assets/images/dark_wall.png"
import { PageWrapInterface } from "../../../interfaces/LayoutInterfaces";

const patternBg = {
  backgroundImage: `url(${patternBackground})`,
};

function FullWrapper({ children, ...rest }: PageWrapInterface) {
  return (
    <div className="w-full" style={patternBg} {...rest}>
      {children}
    </div>
  );
}

export default FullWrapper;
