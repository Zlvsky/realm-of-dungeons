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
            text={`Level ${level}`}
            x={92}
            y={4}
            style={
              new TextStyle({
                align: "center",
                fontFamily: "sans-serif",
                fontWeight: "200",
                fontSize: 20,
                fill: ["#ffffff"],
              })
            }
          />
          <Text
            text={name}
            x={105}
            y={45}
            style={
              new TextStyle({
                align: "center",
                fontFamily: "sans-serif",
                fontWeight: "200",
                fontSize: 20,
                fill: ["#ffffff"],
              })
            }
          />
        </Container>
      </Container>
    );
}

export default Portrait;