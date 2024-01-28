import { Container } from "@pixi/react";
import { Text as AnimatedText } from "@pixi/react-animated";
import { TextStyle } from "pixi.js";
import { Spring } from "react-spring";

function ExclamationMark({position}: any) {
  const textStyle = new TextStyle({
    fontFamily: "Almendra",
    fontSize: 100,
    fill: "#D5C532",
    stroke: "#000000",
    strokeThickness: 6,
    letterSpacing: 0,
  });

  return (
    <Container position={position}>
      <Spring
        from={{
          y: 0,
        }}
        to={[
          {
            y: 10,
          },
          {
            y: 0,
          },
        ]}
        config={{ friction: 2, duration: 1000 }}
        loop
      >
        {(props: any) => {
          return (
            <AnimatedText
              isSprite={true}
              text={"!"}
              style={textStyle}
              {...props}
            />
          );
        }}
      </Spring>
    </Container>
  );
}

export default ExclamationMark;
