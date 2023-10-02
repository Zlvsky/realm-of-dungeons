import { Container, Sprite } from "@pixi/react";
import { equipmentSlots } from "../helpers/slots";
import { getEquipmentPosition } from "../helpers/getEquipmentPosition";

interface IEmptyEquipmentSlot {
  heroEquipment: {
    type: string;
    item: any;
  }[]
}

function EmpyEquipmentSlots({heroEquipment}: IEmptyEquipmentSlot) {
  return (
    <>
      {heroEquipment.map((slot, index) => {
        if (Boolean(slot.item)) return null;
        const position = getEquipmentPosition(slot.type, slot.type);
        if (!position) return null;
        return (
          <Sprite
            image={equipmentSlots[index].slotImage}
            width={60}
            height={60}
            x={position.x}
            y={position.y}
            anchor={0.5}
          />
        );
      })}
      
    </>
  );
}

export default EmpyEquipmentSlots;