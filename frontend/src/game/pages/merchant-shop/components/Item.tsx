import { Sprite } from '@pixi/react';

function Item({ itemData, itemPosition, setCurrentItem, action, anchor }: any) {
  const isInteractive = setCurrentItem === undefined ? false : true 

  const handlePointerDown = () => {
    if (!isInteractive) return;
    return setCurrentItem({
          itemData: itemData,
          action: action,
        })
  }

  return (
    <Sprite
      image={itemData.item.image}
      position={itemPosition}
      width={60}
      height={60}
      interactive={isInteractive}
      cursor={isInteractive ? "pointer" : "default"}
      anchor={anchor}
      onpointerdown={handlePointerDown}
    />
  );
}

export default Item;