import { useCallback, useRef } from "react";
import { Graphics } from "@pixi/react";
interface IItemSlot {
  x: number;
  y: number;
}

const InventorySlotShop = ({ x, y }: IItemSlot) => {
  const slotRef = useRef<any>(null);

  const slotFrame = useCallback((g: any) => {
    g.clear();
    g.lineStyle(1, 0x656565);
    g.beginFill(0x212121, 0.6);
    g.drawRect(0, 0, 80, 80);
    g.endFill();
  }, []);

  return (
    <Graphics ref={slotRef} x={x} y={y} draw={slotFrame} interactive={true} />
  );
};

export default InventorySlotShop;
