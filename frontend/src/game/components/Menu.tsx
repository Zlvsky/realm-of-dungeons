import React from 'react';
import { Stage, Container, Sprite, Text } from "@pixi/react";
import btnImg from "../../assets/images/btn.png"

function Menu({ size, setCurrentStage }: any) {
  return (
    <Container width={150} scale={[size.scaleW, size.scaleH]} position={[0, 0]}>
      <Sprite
        image={btnImg}
        width={150}
        height={120}
        x={0}
        y={0}
        cursor={"pointer"}
        interactive={true}
        onclick={() => setCurrentStage("quests")}
      />
      <Sprite
        image={btnImg}
        width={150}
        height={120}
        x={0}
        y={120}
        interactive={true}
        cursor={"pointer"}
        onclick={() => setCurrentStage("hero")}
      />
    </Container>
  );
}

export default Menu;