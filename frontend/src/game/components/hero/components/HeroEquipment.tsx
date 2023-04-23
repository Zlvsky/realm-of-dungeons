import React, { useState } from 'react';
import { Stage, Container, Sprite, Text, Graphics } from "@pixi/react";
import { useSelector } from 'react-redux';
import { getHero } from '../../../../redux/reducers/gameSlice';
import ItemSlot from './ItemSlot';
import Item from './Item';
import { equipmentSlots, inventorySlots } from "../helpers/slots";
import InventorySlot from './InventorySlot';

function HeroEquipment() {
    const hero = useSelector(getHero);
    const [currentItemTypeDragging, setCurrentItemTypeDragging] = useState<string | null>(null);
    const [itemPositions, setItemPositions] = useState<any>([]);


    

    const handleItemDrop = (position: any) => {
      const closestSlotIndex = getItemSlotOnDrop(currentItemTypeDragging!);
      const isInSlot = checkIfInsideSlot(position, closestSlotIndex);
      if (isInSlot) return closestSlotIndex;
      return false;
    };

    const getItemSlotOnDrop = (type: string) => {
      const slot = equipmentSlots.find(el => el.type === type);
      return slot;
    }

    const checkIfInsideSlot = (position: any, itemSlot: any) => {
      const xStatement = position.x >= itemSlot.x && position.x <= itemSlot.x + 80;
      const yStatement = position.y >= itemSlot.y && position.y <= itemSlot.y + 80;
      if(xStatement && yStatement) return true;
      return false;
    }

    // const getClosestSlotIndex = (position: any) => {
    //   let closestDistance = Infinity;
    //   let closestIndex = 0;
    //   equipmentSlots.forEach((slotPosition, index) => {
    //     const distance = getDistance(position, slotPosition);
    //     if (distance < closestDistance) {
    //       closestDistance = distance;
    //       closestIndex = index;
    //     }
    //   });
    //   return closestIndex;
    // };

    const getDistance = (p1: any, p2: any) => {
      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      return Math.sqrt(dx * dx + dy * dy);
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
        <Item
          onDrop={handleItemDrop}
          setCurrentItem={setCurrentItemTypeDragging}
        />
      </Container>
    );
}

export default HeroEquipment;