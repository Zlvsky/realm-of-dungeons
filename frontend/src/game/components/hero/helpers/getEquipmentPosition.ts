import { equipmentSlots, inventorySlots } from "./slots";

export const getEquipmentSlot = (type: string) => {
  const slot = equipmentSlots.find((el) => el.type === type);
  return slot;
};

export const getEquipmentPosition = (type: string) => {
    const slot = getEquipmentSlot(type);
    if(!slot) return;
    return { x: slot.x + 40, y: slot.y + 40}
};

export const getInventorySlot = (position: any) => {
  const slotSize = 80;
  const x = position.x;
  const y = position.y;
  for (let i = 0; i < inventorySlots.length; i++) {
    const slot = inventorySlots[i];
    if (
      x >= slot.x &&
      x <= slot.x + slotSize &&
      y >= slot.y &&
      y <= slot.y + slotSize
    ) {
      return i;
    }
  }
  return -1;
}