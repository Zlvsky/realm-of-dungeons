import React, { useState } from 'react';
import { Stage, Container, Sprite, Text, Graphics } from "@pixi/react";
import { useSelector } from 'react-redux';
import { getHero } from '../../../../redux/reducers/gameSlice';
import ItemSlot from './ItemSlot';
import Item from './Item';

const itemSlotPositions = [
  { x: 0, y: 0 },
  { x: 0, y: 100 },
  { x: 0, y: 200 },
  { x: 0, y: 300 },
];

function HeroEquipment() {
    const hero = useSelector(getHero);
    const [itemPositions, setItemPositions] = useState<any>([]);

    const handleItemDrop = (position: any) => {
      const closestSlotIndex = getClosestSlotIndex(position);
      const updatedItemPositions = [...itemPositions];
      updatedItemPositions[closestSlotIndex] = position;
      setItemPositions(updatedItemPositions);
    };

    const getClosestSlotIndex = (position: any) => {
      let closestDistance = Infinity;
      let closestIndex = 0;
      itemSlotPositions.forEach((slotPosition, index) => {
        const distance = getDistance(position, slotPosition);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });
      return closestIndex;
    };

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
        {itemSlotPositions.map((position, index) => (
          <ItemSlot
            key={index}
            x={position.x}
            y={position.y}
          />
        ))}
        <Item onDrop={handleItemDrop} />
      </Container>
    );
}

export default HeroEquipment;