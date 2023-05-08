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

export const getInventorySlot = (slotIndex: number) => {
  const slot = inventorySlots[slotIndex];
  return slot;
}