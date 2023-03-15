import React from 'react';
import { Container } from "@pixi/react";
import Hero from './hero/Hero';
import Quests from './quests/Quests';
import { useSelector } from 'react-redux';
import { getCurrentStage, getGameDimensions } from '../../redux/reducers/gameSlice';

function GameWorld() {
  const dimensions = useSelector(getGameDimensions);
  const stage = useSelector(getCurrentStage);
  const CurrentStage = () => {
    if (stage === "hero") return <Hero />;
    if (stage === "quests") return <Quests />;
    return <></>;
  };
  console.log(dimensions);
  
  return (
    <Container
      scale={[dimensions.scaleW, dimensions.scaleH]}
      position={[350 * dimensions.scaleW, 0]}
    >
      <CurrentStage />
    </Container>
  );
}

export default GameWorld;