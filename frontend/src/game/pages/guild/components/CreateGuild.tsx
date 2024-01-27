import { Container, Graphics, Text } from '@pixi/react';
import { TextStyle } from 'pixi.js';
import React, { useCallback, useRef, useEffect } from 'react';

import { Input } from '@pixi/ui';
import TextInput from './TextInput';
import generateTextInput from './TextInput';

const rectWidth = 550;
const rectHeight = 300;

function CreateGuild() {
    const containerRef = useRef<any>(null);

    const createFrame = useCallback((g: any) => {
      g.clear();

      g.beginFill(0x2c2c2c, 0.3);
      g.lineStyle(2, 0x656565, 1);

      g.moveTo(0, 0);
      g.lineTo(rectWidth, 0);
      g.lineTo(rectWidth, rectHeight);
      g.lineTo(0, rectHeight);
      g.lineTo(0, 0);

      g.endFill();
    }, []);

    useEffect(() => {
        if (!containerRef.current) return;
        generateTextInput(containerRef);
    }, []);

    return (
      <Container position={[40, 600]} ref={containerRef} >
        <Graphics draw={createFrame} zIndex={10} />
        <Text
          text={"Create your own Guild"}
          anchor={[0.5, 0]}
          x={rectWidth / 2}
          y={10}
          style={
            new TextStyle({
              align: "center",
              fontFamily: "Almendra",
              fontSize: 26,
              letterSpacing: 1,
              fill: ["#ffffff"],
            })
          }
        />
        <Text
          text={"It seems like you are not member in any Guild."}
          y={60}
          x={10}
          style={
            new TextStyle({
              align: "left",
              fontFamily: "Almendra",
              fontSize: 20,
              letterSpacing: 0.4,
              fill: ["#ffffff"],
            })
          }
        />
        <Text
          text={"If you wish to create one, pay a fee and name your guild"}
          y={85}
          x={10}
          style={
            new TextStyle({
              align: "left",
              fontFamily: "Almendra",
              fontSize: 20,
              letterSpacing: 0.4,
              fill: ["#ffffff"],
            })
          }
        />

      </Container>
    );
}

export default CreateGuild;