import { Sprite } from '@pixi/react';
import buyBtn from "../../../../../assets/images/buybtn.png";
import sellBtn from "../../../../../assets/images/sellbtn.png";


interface IActionButton {
  action?: "BUY" | "SELL" | "EQUIP" | "UNEQUIP";
  boxWidth: number;
  boxHeight: number;
  handleAction: any;
}

function ActionButton({
  action,
  boxWidth,
  boxHeight,
  handleAction,
}: IActionButton) {
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
  };

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
      onpointerdown={handleAction}
    />
  );
}

export default ActionButton;