import React from "react";
import { Graphics } from "@pixi/react";

interface IItemSlot {
    x: number;
    y: number;
}

const ItemSlot = ({ x, y }: IItemSlot) => {
  const handleDragStart = (event: any) => {
    // Called when an item starts being dragged
    // Store the item data for use in handleDrop later
    event.data.itemData = { itemId: event.target.itemId };
  };

  const handleDragEnd = (event: any) => {
    // Called when an item is dropped onto the item slot
    const itemData = event.data.itemData;
    if (itemData) {
      event.data.itemData = null;
    }
  };

  return (
    <Graphics
      x={x}
      y={y}
      draw={(g) => {

        g.lineStyle(2, 0x656565);
        g.drawRect(0, 0, 80, 80);
        g.endFill();
      }}
      interactive={true}
      pointerdown={handleDragStart}
      pointerup={handleDragEnd}
    />
  );
};

export default ItemSlot;