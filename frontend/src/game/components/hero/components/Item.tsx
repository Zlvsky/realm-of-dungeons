import React, {useState,useRef, useEffect, useContext} from "react";
import { Sprite, Text } from "@pixi/react";
import PIXI, { TextStyle } from "pixi.js";
import AxePng from "../../../../assets/images/axe.png";
import { updateEquipment, updateInventory } from "../../../../client/appClient";
import { ReactReduxContext, useDispatch } from "react-redux";
import fetchHero from "../../../../utils/fetchers/fetchHero";
import { connect } from "react-redux";
import { setHero } from "../../../../redux/reducers/gameSlice";

const useDrag = ({ x, y, onDrop, setCurrentItem, itemData }: any) => {
  const sprite = React.useRef<any>();
  const [isDragging, setIsDragging] = React.useState(false);
  const [position, setPosition] = React.useState({ x, y });

  const onDown = React.useCallback(() => {
    setIsDragging(true);
    setCurrentItem(itemData.item.type)
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

const Item = ({
  itemData,
  onDrop,
  setCurrentItem,
  itemPosition,
  inventoryIndex,
  updateHero,
}: any) => {
  const [position, setPosition] = useState(itemPosition);
  // const dispatch = useDispatch();
  const dispatch = useContext(ReactReduxContext).store.dispatch;

  const handleEquipmentRequest = async (type: string) => {
    const response = await updateEquipment({
      itemType: type,
      itemId: itemData.item._id,
    });
    if (response.status !== 200) return console.log(response.data);
    fetchHero(updateHero);
    console.log("success,", response.data);
  };

  const handleInventoryRequest = async (slotIndex: number) => {
    const response = await updateInventory({
      itemId: itemData.item._id,
      slotIndex: slotIndex,
      lastIndex: inventoryIndex,
    });
    console.log("as");
    fetchHero(updateHero);
    if (response.status !== 200) return console.log(response.data);
    console.log("success,", response.data);
  };

  const bind = useDrag({
    x: position.x,
    y: position.y,
    onDrop: (newPosition: any) => {
      const slotData = onDrop(newPosition);
      if (!slotData) return position;
      const slot = slotData.position;
      const slotType = slotData.slotType;
      const slotPosition = { x: slot.x + 40, y: slot.y + 40 };
      if (slotType === "EQUIPMENT") handleEquipmentRequest(slot.type);
      else if (slotType === "INVENTORY") handleInventoryRequest(slotData.slotIndex);
      setPosition(slotPosition);
      return slotPosition;
    },
    setCurrentItem: setCurrentItem,
    itemData: itemData,
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

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateHero: (data: any) => dispatch(setHero(data)),
  };
};

export default connect(null, mapDispatchToProps)(Item);
