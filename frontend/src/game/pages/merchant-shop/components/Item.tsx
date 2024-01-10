import { Sprite } from '@pixi/react';

function Item({ itemData, itemPosition, setCurrentItem, action }: any) {
  return (
    <Sprite
      image={itemData.item.image}
      position={itemPosition}
      width={60}
      height={60}
      interactive={true}
      cursor="pointer"
      onpointerdown={() =>
        setCurrentItem({
          itemData: itemData,
          action: action,
        })
      }
    />
  );
}

export default Item;