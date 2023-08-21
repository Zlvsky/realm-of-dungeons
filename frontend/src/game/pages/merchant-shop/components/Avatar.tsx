import { Container, Graphics, Sprite, Text } from "@pixi/react";
import { TextStyle } from "pixi.js";

interface IAvatar {
    image: string;
    name: string;
}

function Avatar({ image, name }: IAvatar) {
    return (
      <Container position={[84, 10]}>
        <Sprite image={image} position={[0, 0]} width={250} height={250}/>
        <Graphics
          x={0}
          y={220}
          draw={(g) => {
            g.clear();
            g.beginFill(0x000000, 0.8);
            g.drawRect(0, 0, 250, 40);
            g.endFill();
          }}
        />
        <Text
          text={name}
          anchor={0.5}
          x={250/ 2}
          y={250 - 10}
          style={
            new TextStyle({
              align: "center",
              fontFamily: "MedievalSharp",
              fontSize: 20,
              fill: ["#898989"],
            })
          }
        />
      </Container>
    );
}

export default Avatar;