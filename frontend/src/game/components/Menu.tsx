import React from 'react';
import { Stage, Container, Sprite, Text } from "@pixi/react";
import btnImg from "../../assets/images/btn.png"

function Menu() {
    const handleClick = () => {
      console.log("Sprite clicked!");
    };
    return (
      <Container position={[0, 0]}>
        <Sprite image={btnImg} width={150} height={120} x={0} y={0} />
        <Sprite
          image={btnImg}
          width={150}
          height={120}
          x={0}
          y={120}
          interactive={true}
          onclick={handleClick}
        />
      </Container>
    );
}

export default Menu;