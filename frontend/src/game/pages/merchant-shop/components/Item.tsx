import { Sprite } from '@pixi/react';

function Item({ itemData, itemPosition, setCurrentItem }: any) {
    return (
      <Sprite
        image={itemData.item.image}
        position={itemPosition}
        width={60}
        height={60}
        interactive={true}
        cursor="pointer"
        onclick={() => setCurrentItem(itemData)}
      />
    );
}

export default Item;