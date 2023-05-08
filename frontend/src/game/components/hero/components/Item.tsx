import React, {useState,useRef, useEffect} from "react";
import { Sprite, Text } from "@pixi/react";
import PIXI, { TextStyle } from "pixi.js";
import AxePng from "../../../../assets/images/axe.png";
import { updateEquipment, updateInventory } from "../../../../client/appClient";

const itemData = {
  equipmentSlot: 1,
  type: "weapon"
}

const useDrag = ({ x, y, onDrop, setCurrentItem }: any) => {
  const sprite = React.useRef<any>();
  const [isDragging, setIsDragging] = React.useState(false);
  const [position, setPosition] = React.useState({ x, y });

  const onDown = React.useCallback(() => {
    setIsDragging(true);
    setCurrentItem(itemData.type)
  }, []);
  const onUp = React.useCallback(() => {
    setIsDragging(false);
    setCurrentItem(null);
    const dropPosition = onDrop(position);
    setPosition(dropPosition);
  }, [position, onDrop]);
  const onMove = React.useCallback(
    (e: any) => {
      if (isDragging) {
        setPosition(e.getLocalPosition(sprite.current.parent));
      }
    },
    [isDragging, setPosition]
  );

  return {
    ref: sprite,
    pointerdown: onDown,
    pointerup: onUp,
    pointerupoutside: onUp,
    pointermove: onMove,
    alpha: isDragging ? 0.5 : 1,
    anchor: 0.5,
    position,
  };
};

const Item = ({ itemData, onDrop, setCurrentItem, itemPosition }: any) => {
  const [position, setPosition] = useState(itemPosition);

  const handleEquipmentRequest = async () => {
    const response = await updateEquipment({ itemType: "weapon" });
    if (response.status !== 200) return console.log(response.data);
    console.log("success,", response.data);
  };

  useEffect(() => {
    handleEquipmentRequest();
  }, [])

  const handleInventoryRequest = async () => {
    const response = await updateInventory({ slotIndex: 1 });
    if (response.status !== 200) return console.log(response.data);
    console.log("success,", response.data);
  };

  const bind = useDrag({
    x: position.x,
    y: position.y,
    onDrop: (newPosition: any) => {
      const slot = onDrop(newPosition);
      if (!slot) return position;
      const slotPosition = { x: slot.x + 40, y: slot.y + 40 };
      handleEquipmentRequest();
      setPosition(slotPosition);
      return slotPosition;
    },
    setCurrentItem: setCurrentItem,
  });
  return (
    <Sprite
      image={itemData.item.image}
      width={60}
      height={60}
      interactive
      {...bind}
    />
  );
};

export default Item;
