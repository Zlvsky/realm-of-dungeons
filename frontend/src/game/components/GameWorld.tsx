import { Container } from "@pixi/react";
import { useSelector } from 'react-redux';
import { getCurrentStage, getGameDimensions } from '../../redux/reducers/gameSlice';
import Hero from "../pages/hero/Hero";
import Quests from "../pages/quests/Quests";
import Temple from '../pages/temple/Temple';
import Merchants from "../pages/merchants/Merchants";

function GameWorld() {
  const dimensions = useSelector(getGameDimensions);
  const stage = useSelector(getCurrentStage);
  const CurrentStage = () => {
    if (stage === "hero") return <Hero />;
    if (stage === "quests") return <Quests />;
    if (stage === "temple") return <Temple />;
    if (stage === "merchants") return <Merchants />;
    return <></>;
  };
  
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