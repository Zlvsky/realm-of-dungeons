import { Stage as PixiStage } from "@pixi/react";
import { ReactReduxContext } from "react-redux";

import ContextBridge from "./ContextBridge";

const GameStage = ({ children, ...props }: any) => {
  return (
    <ContextBridge
      Context={ReactReduxContext}
      render={(children: any) => <PixiStage {...props}>{children}</PixiStage>}
    >
      {children}
    </ContextBridge>
  );
};

export default GameStage;