import { useState, useEffect } from 'react';
import { Container } from "@pixi/react";
import { useSelector } from 'react-redux';
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
import HeroInfo from './HeroInfo';
import HeroStats from './HeroStats';
import ItemPreview from '../../../components/items/item-preview/ItemPreview';
import { getHero } from '../../../../redux/reducers/gameSlice';

function HeroEquipment() {
  const hero = useSelector(getHero)!;
  const [currentItem, setCurrentItem] = useState<any>(null);
  const [currentItemPreview, setCurrentItemPreview] = useState<any>(null);
  const [inventory, setInventory] = useState<any>([]);

  useEffect(() => {
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
    const closestSlotIndex = getEquipmentSlot(currentItem?.type);
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
    <Container position={[100, 150]} interactive={true}>
      <HeroInfo hero={hero} />
      <HeroStats hero={hero} />
      {equipmentSlots.map((position, index) => (
        <ItemSlot
          key={index}
          x={position.x}
          y={position.y}
          currentItem={currentItem?.type}
          itemType={position.type}
        />
      ))}
      {inventorySlots.map((position, index) => (
        <InventorySlot
          key={index}
          x={position.x}
          y={position.y}
          currentItem={currentItem?.type}
        />
      ))}
      {/* equipment items */}
      {hero.equipment.map((item: any, index: number) => {
        if (item.item !== null)
          return (
            <Item
              key={index}
              itemData={item}
              itemPosition={getEquipmentPosition(item.type)}
              itemSpot={"EQUIPMENT"}
              onDrop={handleItemDrop}
              setCurrentItem={setCurrentItem}
              setCurrentItemPreview={setCurrentItemPreview}
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
              itemSpot={"INVENTORY"}
              onDrop={handleItemDrop}
              inventoryIndex={index}
              setCurrentItem={setCurrentItem}
              setCurrentItemPreview={setCurrentItemPreview}
            />
          );
      })}
      {currentItemPreview && (
        <ItemPreview
          position={[670, -70]}
          itemData={currentItemPreview}
        />
      )}
    </Container>
  );
}

export default HeroEquipment;