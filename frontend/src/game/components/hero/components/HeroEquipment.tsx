import React, { useState, useEffect, useContext } from 'react';
import { Stage, Container, Sprite, Text, Graphics } from "@pixi/react";
import {  connect } from 'react-redux';
import { getHero } from '../../../../redux/reducers/gameSlice';
import ItemSlot from './ItemSlot';
import Item from './Item';
import { equipmentSlots, inventorySlots } from "../helpers/slots";
import InventorySlot from './InventorySlot';
import {
  getEquipmentPosition,
  getEquipmentSlot,
  getInventoryPosition,
  getInventorySlot,
} from "../helpers/getEquipmentPosition";

function HeroEquipment({ game }: any) {
  // const hero = useSelector(getHero);
  const hero = game.hero;
  const [currentItemTypeDragging, setCurrentItemTypeDragging] = useState<
    string | null
  >(null);
  const [inventory, setInventory] = useState([]);
  
  
  useEffect(() => {
    console.log("a", hero);
  
    setInventory(hero.inventory);
  }, [hero]);
 
 
  const handleItemDrop = (position: any) => {
    const returnData: {
      position: any;
      slotType: string;
      slotIndex: number;
    } = {
      position: null,
      slotType: "",
      slotIndex: -1,
    };
    const closestSlotIndex = getEquipmentSlot(currentItemTypeDragging!);
    const isInSlot = checkIfInsideSlot(position, closestSlotIndex);
    if (isInSlot) {
      returnData.position = closestSlotIndex;
      returnData.slotType = "EQUIPMENT";
      return returnData;
    }
    const closestInventorySlotIndex = getInventorySlot(position);
    if (closestInventorySlotIndex !== -1) {
      returnData.position = inventorySlots[closestInventorySlotIndex];
      returnData.slotType = "INVENTORY";
      returnData.slotIndex = closestInventorySlotIndex;
      return returnData;
    }
    return false;
  };

  const checkIfInsideSlot = (position: any, itemSlot: any) => {
    if (!itemSlot) return false;
    const xStatement =
      position.x >= itemSlot.x && position.x <= itemSlot.x + 80;
    const yStatement =
      position.y >= itemSlot.y && position.y <= itemSlot.y + 80;
    if (xStatement && yStatement) return true;
    return false;
  };

  return (
    <Container position={[100, 150]}>
      <Sprite
        image={hero?.avatar}
        position={[120, 0]}
        width={250}
        height={250}
      />
      {equipmentSlots.map((position, index) => (
        <ItemSlot
          key={index}
          x={position.x}
          y={position.y}
          currentItem={currentItemTypeDragging}
          itemType={position.type}
        />
      ))}
      {inventorySlots.map((position, index) => (
        <InventorySlot
          key={index}
          x={position.x}
          y={position.y}
          currentItem={currentItemTypeDragging}
        />
      ))}
      {/* <Item
          itemData={{
            type: "weapon",
            item: {
              type: "weapon",
              image: "https://i.ibb.co/4WQXBvQ/crystal-Double-Axe.png",
            },
          }}
          itemPosition={{ x: 1, y: 1 }}
          onDrop={handleItemDrop}
          setCurrentItem={setCurrentItemTypeDragging}
        /> */}
      {/* equipment items */}
      {hero.equipment.map((item: any, index: number) => {
        if (item.item !== null)
          return (
            <Item
              key={index}
              itemData={item}
              itemPosition={getEquipmentPosition(item.type)}
              onDrop={handleItemDrop}
              setCurrentItem={setCurrentItemTypeDragging}
            />
          );
      })}
      {/* inventory items */}
      {inventory?.map((item: any, index: number) => {
        if (item.item !== null)
          return (
            <Item
              key={index}
              itemData={item}
              itemPosition={getInventoryPosition(item.slotIndex)}
              onDrop={handleItemDrop}
              setCurrentItem={setCurrentItemTypeDragging}
              inventoryIndex={index}
            />
          );
      })}
    </Container>
  );
}


const mapStateToProps = ({ game }: any) => ({ game });

export default connect(mapStateToProps)(HeroEquipment);