import React, { useState, useEffect } from 'react';
import { Stage, Container, Sprite, Text, Graphics } from "@pixi/react";
import { useSelector } from 'react-redux';
import { getHero } from '../../../../redux/reducers/gameSlice';
import ItemSlot from './ItemSlot';
import Item from './Item';
import { equipmentSlots, inventorySlots } from "../helpers/slots";
import InventorySlot from './InventorySlot';
import {
  getEquipmentPosition,
  getEquipmentSlot,
  getInventorySlot,
} from "../helpers/getEquipmentPosition";

function HeroEquipment() {
    const hero = useSelector(getHero);
    const [currentItemTypeDragging, setCurrentItemTypeDragging] = useState<string | null>(null);
    console.log(hero);
 
    const handleItemDrop = (position: any) => {
      const closestSlotIndex = getEquipmentSlot(currentItemTypeDragging!);
      const isInSlot = checkIfInsideSlot(position, closestSlotIndex);
      if (isInSlot) return closestSlotIndex;
      return false;
    };

    const handleInventoryItemDrop = (position: any) => {
      // check every element in array to see if its inside
      const closestSlotIndex = getInventorySlot(currentItemTypeDragging!);
      const isInSlot = checkIfInsideSlot(position, closestSlotIndex);
      if (isInSlot) return closestSlotIndex;
      return false;
    };

    const checkIfInsideSlot = (position: any, itemSlot: any) => {
      const xStatement = position.x >= itemSlot.x && position.x <= itemSlot.x + 80;
      const yStatement = position.y >= itemSlot.y && position.y <= itemSlot.y + 80;
      if(xStatement && yStatement) return true;
      return false;
    }
    
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
        <Item
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
        />
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
        {hero.inventory.map((item: any, index: number) => {
          if (item.item !== null)
            return (
              <Item
                key={index}
                itemData={item}
                itemPosition={inventorySlots[item.slotIndex]}
                onDrop={handleInventoryItemDrop}
                setCurrentItem={setCurrentItemTypeDragging}
              />
            );
        })}
      </Container>
    );
}

export default HeroEquipment;