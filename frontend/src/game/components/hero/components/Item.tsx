import React, {useRef} from "react";
import { Sprite, Text } from "@pixi/react";
import { InteractionData, InteractionEvent } from "@pixi/interaction";
import PIXI, { TextStyle } from "pixi.js";
import AxePng from "../../../../assets/images/axe.png";

interface Draggable extends PIXI.DisplayObject {
  data: InteractionData | null;
  dragging: boolean;
}

const Item = ({ itemData }: any) => {
    const itemRef = useRef<any>(null);
    const onDragStart = (event: InteractionEvent) => {
        console.log(itemRef.current);
      const sprite = event.currentTarget as unknown as Draggable;
      sprite.alpha = 0.5;
      sprite.data = event.data;
      sprite.dragging = true;
    };

    const onDragEnd = (event: InteractionEvent) => {
      const sprite = event.currentTarget as unknown as Draggable;
      sprite.alpha = 1;
      sprite.dragging = false;
      sprite.data = null;
    };

    const onDragMove = (event: InteractionEvent) => {
      const sprite = event.currentTarget as unknown as Draggable;
      if (sprite.dragging) {
        const newPosition = sprite.data!.getLocalPosition(sprite.parent);
        sprite.x = newPosition.x;
        sprite.y = newPosition.y;
      }
    };
  return (
    <Sprite
      image={AxePng}
      width={60}
      height={60}
      x={10}
      y={10}
      interactive
      buttonMode
      pointerdown={onDragStart}
      pointerup={onDragEnd}
      pointerupoutside={onDragEnd}
      pointermove={onDragMove}
      ref={itemRef}
    >
      {/* <Text
        text={itemData.name}
        anchor={[0.5, 0]}
        style={
          new TextStyle({
            fontSize: 26,
          })
        }
      />
      <Text
        text={itemData.description}
        anchor={[0.5, 1]}
        style={
          new TextStyle({
            fontSize: 26,
          })
        }
      />
      <Text
        text={`Damage: ${itemData.damage}`}
        anchor={[0.5, 0.5]}
        style={
          new TextStyle({
            fontSize: 26,
          })
        }
      /> */}
    </Sprite>
  );
};

export default Item;
