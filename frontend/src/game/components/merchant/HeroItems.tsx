import { Container } from "@pixi/react";
import Item from "./Item";
import { shopHeroInventorySlots } from "../../pages/hero/helpers/slots";

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
              action={"SELL"}
            />
          );
      })}
    </Container>
  );
}

export default HeroItems;