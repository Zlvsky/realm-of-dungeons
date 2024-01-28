import { Text } from '@pixi/react';
import { Rectangle, TextStyle } from 'pixi.js';
import { useRef } from 'react';

function HoveredLabel({ x, y, hitArea, text, onclick }:any ) {
    const labelRef: any = useRef<any>(null)

    const labelStyle = new TextStyle({
      fontFamily: "Almendra",
      fontSize: 34,
      fill: "#ffffff",
      stroke: "#000000",
      strokeThickness: 6,
      letterSpacing: 0
    });

    const onHover = (e: any) => {
        e.target.tint = "0xAC320F";
    }

    const onHoverLeave = (e: any) => {
        e.target.tint = "0xffffff";
    }

    return (
      <Text
        text={text}
        x={x}
        y={y}
        style={labelStyle}
        ref={labelRef}
        hitArea={new Rectangle(hitArea[0], hitArea[1], hitArea[2], hitArea[3])}
        interactive
        cursor="pointer"
        onpointerenter={onHover}
        onpointerleave={onHoverLeave}
        onpointertap={onclick}
      />
    );
}

export default HoveredLabel;