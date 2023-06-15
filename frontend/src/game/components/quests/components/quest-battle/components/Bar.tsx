import { Container, Graphics, Text } from "@pixi/react";
import { TextStyle } from "pixi.js";

function Bar({ position, name, value, maxValue }: any) {
  const percentage = Math.floor((value / maxValue) * 350);
  const barColor = name === "Mana" ? 0x248092 : 0x932424;
  return (
    <Container position={position}>
      <Text
        text={`${name}: ${value}`}
        x={0}
        y={0}
        style={
          new TextStyle({
            align: "center",
            fontFamily: "sans-serif",
            fontWeight: "200",
            fontSize: 16,
            fill: ["#D1D1D1"],
          })
        }
      />
      <Container position={[0, 30]}>
        <Graphics
          x={0}
          y={0}
          draw={(g) => {
            g.clear();
            g.beginFill(0x1b1b1b);
            g.drawRect(0, 0, 350, 12);
            g.endFill();
          }}
        />
        <Graphics
          x={0}
          y={0}
          draw={(g) => {
            g.clear();
            g.beginFill(barColor);
            g.drawRect(0, 0, percentage, 12);
            g.endFill();
          }}
        />
      </Container>
    </Container>
  );
}

export default Bar;
