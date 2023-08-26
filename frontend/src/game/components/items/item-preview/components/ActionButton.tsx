import { Sprite } from '@pixi/react';
import buyBtn from "../../../../../assets/images/buybtn.png";
import sellBtn from "../../../../../assets/images/sellbtn.png";


interface IActionButton {
  action?: "BUY" | "SELL" | "EQUIP" | "UNEQUIP";
  boxWidth: number;
  boxHeight: number;
}

function ActionButton({ action, boxWidth, boxHeight }: IActionButton) {
    const getActionButton = () => {
      switch (action) {
        case "BUY":
          return buyBtn;
        case "SELL":
          return sellBtn;
        case "EQUIP":
          return "FOOBAR";
        case "UNEQUIP":
          return "FOOBAR";
      }
    }

  const handleBuyAction = () => {}
  const handleSellAction = () => {}

  const handleAction = () => {
    switch (action) {
      case "BUY":
        return handleBuyAction();
      case "SELL":
        return handleSellAction();
      case "EQUIP":
        return handleBuyAction();
      case "UNEQUIP":
        return handleBuyAction();
    }
  }

  if (!action) return null;

  return (
    <Sprite
      image={getActionButton()}
      width={150}
      height={45}
      anchor={0.5}
      x={boxWidth / 2}
      y={boxHeight + 40}
      cursor={"pointer"}
      interactive={true}
      onclick={handleAction}
    />
  );
}

export default ActionButton;