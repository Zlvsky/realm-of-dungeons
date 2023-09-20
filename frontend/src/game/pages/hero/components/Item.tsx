import React, {useState,useRef, useEffect} from "react";
import { Sprite } from "@pixi/react";
import { updateEquipmentToInventory, updateInventoryToEquipment, updateInventoryToInventory } from "../../../../client/appClient";
import fetchHero from "../../../../utils/fetchers/fetchHero";
import { useDispatch } from "react-redux";
import { setHero } from "../../../../redux/reducers/gameSlice";

const useDrag = ({ x, y, onDrop, setCurrentItem, setCurrentItemPreview, itemData }: any) => {
  const sprite = useRef<any>();
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x, y });
  const [currentItemId, setCurrentItemId] = useState<string | null>(null);

  const checkApiPosition = () => {
    if (position.x !== x && position.y !== y) setPosition({ x, y });
  };

  const setPreview = () => {
    setCurrentItemPreview(itemData.item);
  }

  const clearPreview = () => {
    setCurrentItemPreview(null);
  }

  useEffect(() => {
    checkApiPosition();
  }, [x, y]);

  const isInteractive = () => {
    if (!isDragging) return true;
    if (currentItemId === itemData._id) return true;
    return false;
  }

  const onDown = React.useCallback((e: any) => {
    e.stopPropagation();
    const stage = sprite.current.parent.parent.parent.parent;
    sprite.current.parent.addChild(sprite.current);
    setIsDragging(true);
    clearPreview();
    setCurrentItem(itemData.item)
    setCurrentItemId(itemData._id);
    stage.interactive = true;
    stage.on("pointermove", onMove);
  }, [itemData]);

  const onUp = React.useCallback(() => {
    const stage = sprite.current.parent.parent.parent.parent;
    stage.off("pointermove", onMove);
    stage.interactive = false;
    setIsDragging(false);
    setCurrentItem(null);
    setCurrentItemId(null);
    const dropPosition = onDrop(position);
    setPosition(dropPosition);
    checkApiPosition();
  }, [position, onDrop]);

  const onMove = React.useCallback(
    (e: any) => {
      e.data.originalEvent.stopPropagation();
      if (sprite.current) {
        const newPosition = e.data.getLocalPosition(sprite.current.parent); 
        setPosition(newPosition);
      }
    },
    [setPosition]
  );


  return {
    ref: sprite,
    pointerdown: onDown,
    pointerup: onUp,
    pointerupoutside: onUp,
    onpointerenter: isDragging ? null : setPreview,
    onpointerleave: isDragging ? null : clearPreview,
    alpha: isDragging ? 0.5 : 1,
    anchor: 0.5,
    position,
    interactive: isInteractive(),
  };
};

const Item = ({
  itemData,
  onDrop,
  setCurrentItem,
  setCurrentItemPreview,
  itemPosition,
  itemSpot,
  inventoryIndex,
}: any) => {
  const [position, setPosition] = useState(itemPosition);
  const dispatch = useDispatch();

  const updateHero = (data: any) => {
    dispatch(setHero(data))
  }

  useEffect(() => {
    setPosition(itemPosition);
  }, [itemPosition])
  
  const handleInventoryToEquipmentRequest = async (type: string) => {
    const response = await updateInventoryToEquipment({
      itemType: type,
      item: itemData.item,
      inventorySlotIndex: itemData.slotIndex
    });
    if (response.status !== 200) return console.log(response.data);
    fetchHero(updateHero);
  };

  const handleInventoryToInventoryRequest = async (slotIndex: number) => {
    if (slotIndex === inventoryIndex) return;
    const response = await updateInventoryToInventory({
      item: itemData.item,
      slotIndex: slotIndex,
      lastIndex: inventoryIndex,
    });
    if (response.status !== 200) return console.log(response.data);
    fetchHero(updateHero);
  };

  const handleEquipmentToInventoryRequest = async (slotIndex: number) => {
    const response = await updateEquipmentToInventory({
      item: itemData.item,
      slotIndex: slotIndex,
      itemType: itemData.item.type,
    });
    if (response.status !== 200) return console.log(response.data);
    fetchHero(updateHero);
  }

  const bind = useDrag({
    x: position.x,
    y: position.y,
    onDrop: (newPosition: any) => {
      const slotData = onDrop(newPosition);
      if (!slotData) return position;
      const slot = slotData.position;
      const slotType = slotData.slotType;
      const slotPosition = { x: slot.x + 40, y: slot.y + 40 };
      if (slotType === "EQUIPMENT" && itemSpot === "INVENTORY")
        handleInventoryToEquipmentRequest(slot.type);
      else if (slotType === "INVENTORY" && itemSpot === "INVENTORY")
        handleInventoryToInventoryRequest(slotData.slotIndex);
      else if (slotType === "INVENTORY" && itemSpot === "EQUIPMENT")
        handleEquipmentToInventoryRequest(slotData.slotIndex);
      setPosition(slotPosition);
      return slotPosition;
    },
    setCurrentItem: setCurrentItem,
    setCurrentItemPreview: setCurrentItemPreview,
    itemSpot: itemSpot,
    itemData: itemData,
  });
  return (
    <Sprite
      image={itemData.item.image}
      width={60}
      height={60}
      cursor="pointer"
      {...bind}
    />
  );
};

export default Item;