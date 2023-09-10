import { useState, useEffect, useRef } from "react";
import { Graphics } from "@pixi/react";

interface IItemSlot {
  x: number;
  y: number;
  currentItem: string | null;
  itemType: string;
}

const ItemSlot = ({ x, y, currentItem, itemType }: IItemSlot) => {
  const slotRef = useRef<any>(null);
  const [borderColor, setBorderColor] = useState("0x656565");
  
  useEffect(() => {
    if (currentItem === itemType) {
      setBorderColor("0xffffff");
    } else {
      setBorderColor("0x656565");
    }
  }, [currentItem]);

  useEffect(() => {
    const graphicsInstance = slotRef.current?.graphics;
    if (graphicsInstance) {
      graphicsInstance.clear();
      graphicsInstance.lineStyle(2, borderColor);
      graphicsInstance.drawRect(0, 0, 80, 80);
    }
  }, [borderColor]);

  return (
    <Graphics
      ref={slotRef}
      x={x}
      y={y}
      draw={(g) => {
        g.lineStyle(2, borderColor);
        g.drawRect(0, 0, 80, 80);
        g.endFill();
      }}
      interactive={true}
    />
  );
};

export default ItemSlot;