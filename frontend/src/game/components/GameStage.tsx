import React, { useEffect } from 'react';
import { Stage, Container, Sprite, Text, Graphics } from "@pixi/react";
import Hero from './hero/Hero';
import Quests from './quests/Quests';

function GameStage({ stage, size }: any) {
  const CurrentStage = () => {
    if (stage === "hero") return <Hero />;
    if (stage === "quests") return <Quests />;
    return <></>;
  };

  return (
    <Container scale={[size.scaleW, size.scaleH]} position={[150, 0]}>
      <CurrentStage />
    </Container>
  );
}

export default GameStage;