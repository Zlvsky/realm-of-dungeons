import { Container, Graphics, Sprite, Text } from '@pixi/react';
import { TextStyle } from 'pixi.js';

function Portrait({ position, name, level, img}: any) {
    return (
      <Container position={position}>
        <Sprite image={img} position={[0, 0]} width={250} height={250} />
        <Container position={[0, 220]}>
          <Graphics
            x={0}
            y={0}
            draw={(g) => {
              g.clear();
              g.beginFill(0x252525);
              g.drawRect(0, 0, 250, 30);
              g.endFill();
            }}
          />
          <Text
            text={`LEVEL ${level}`}
            x={250 / 2}
            anchor={0.5}
            y={15}
            style={
              new TextStyle({
                align: "center",
                fontFamily: "MedievalSharp",
                fontSize: 18,
                fill: ["#ffffff"],
              })
            }
          />
          <Text
            text={name}
            y={50}
            x={250 / 2}
            anchor={0.5}
            style={
              new TextStyle({
                align: "center",
                fontFamily: "Almendra",
                fontSize: 22,
                fill: ["#ffffff"],
              })
            }
          />
        </Container>
      </Container>
    );
}

export default Portrait;