import { Container, Sprite, Text } from "@pixi/react";
import { TextStyle } from "pixi.js";

const IconWithText = ({ text, image, position, textStyle, imageWidth=50, imageHeight=50, imageY=-6, textX=60 }: any) => {
  return (
    <Container position={position}>
      <Sprite
        image={image}
        width={imageWidth}
        height={imageHeight}
        x={0}
        y={imageY}
      />
      <Text text={text} x={textX} y={6} style={new TextStyle(textStyle)} />
    </Container>
  );
};
export default IconWithText