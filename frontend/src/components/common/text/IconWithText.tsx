import { Container, Sprite, Text } from "@pixi/react";
import { TextStyle } from "pixi.js";

const IconWithText = ({ text, image, position }: any) => {
  return (
    <Container position={position}>
      <Sprite image={image} width={50} height={50} x={0} y={-6} />
      <Text
        text={text}
        x={60}
        y={6}
        style={
          new TextStyle({
            align: "center",
            fontFamily: "MedievalSharp",
            fontSize: 24,
            fill: ["#BCBCBC"],
            wordWrap: true,
            wordWrapWidth: 610,
          })
        }
      />
    </Container>
  );
};
export default IconWithText