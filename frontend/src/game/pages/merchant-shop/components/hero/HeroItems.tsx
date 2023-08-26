import { Container } from "@pixi/react";
import { getInventoryPosition } from "../../../hero/helpers/getEquipmentPosition";
import Item from "../Item";
import { shopHeroInventorySlots } from "../../../hero/helpers/slots";

function HeroItems({ inventory, setCurrentItem }: any) {
  const getInventoryPosition = (slotIndex: number) => {
    const slot = shopHeroInventorySlots[slotIndex];
    if (!slot) return;
    return { x: slot.x + 10, y: slot.y + 10 };
  };

  if (!inventory) return null;
  return (
    <Container>
      {inventory.map((item: any, index: number) => {
        if (item.item !== null)
          return (
            <Item
              key={index}
              itemData={item}
              itemPosition={getInventoryPosition(item.slotIndex)}
              setCurrentItem={setCurrentItem}
            />
          );
      })}
    </Container>
  );
}

export default HeroItems;