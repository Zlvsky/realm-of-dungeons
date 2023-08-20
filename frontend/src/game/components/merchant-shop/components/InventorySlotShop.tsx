import { useRef } from "react";
import { Graphics } from "@pixi/react";

interface IItemSlot {
  x: number;
  y: number;
}

const InventorySlotShop = ({ x, y }: IItemSlot) => {
  const slotRef = useRef<any>(null);

  return (
    <Graphics
      ref={slotRef}
      x={x}
      y={y}
      draw={(g) => {
        g.lineStyle(2, 0x656565);
        g.drawRect(0, 0, 80, 80);
        g.endFill();
      }}
      interactive={true}
    />
  );
};

export default InventorySlotShop;
