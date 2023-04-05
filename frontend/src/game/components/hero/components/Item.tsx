import React, {useState,useRef} from "react";
import { Sprite, Text } from "@pixi/react";
import PIXI, { TextStyle } from "pixi.js";
import AxePng from "../../../../assets/images/axe.png";

const useDrag = ({ x, y, onDrop }: any) => {
  const sprite = React.useRef<any>();
  const [isDragging, setIsDragging] = React.useState(false);
  const [position, setPosition] = React.useState({ x, y });

  const onDown = React.useCallback(() => setIsDragging(true), []);
  const onUp = React.useCallback(() => {
    setIsDragging(false);
    onDrop(position);
  }, [position, onDrop]);
  const onMove = React.useCallback(
    (e: any) => {
      if (isDragging) {
        console.log(sprite.current);

        setPosition(e.getLocalPosition(sprite.current.parent));
      }
    },
    [isDragging, setPosition]
  );

  return {
    ref: sprite,
    pointerdown: onDown,
    pointerup: onUp,
    pointerupoutside: onUp,
    pointermove: onMove,
    alpha: isDragging ? 0.5 : 1,
    anchor: 0.5,
    position,
  };
};

const Item = ({ onDrop }: any) => {
  const [position, setPosition] = useState({ x: 10, y: 10 });
  const bind = useDrag({
    x: position.x,
    y: position.y,
    onDrop: (newPosition: any) => {
      setPosition(newPosition);
      onDrop(newPosition);
    },
  });
  return (
    <Sprite
      image={AxePng}
      width={60}
      height={60}
      interactive
      {...bind}
      />
  );
};

export default Item;
