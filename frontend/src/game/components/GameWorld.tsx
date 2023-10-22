import { Container } from "@pixi/react";
import { useSelector } from 'react-redux';
import { getCurrentStage, getGameDimensions, getHero } from '../../redux/reducers/gameSlice';
import Hero from "../pages/hero/Hero";
import Quests from "../pages/quests/Quests";
import Temple from '../pages/temple/Temple';
import Merchants from "../pages/merchants/Merchants";
import { useMemo } from "react";
import Portals from "../pages/portals/Portals";
import Trainers from "../pages/trainers/Trainers";

function GameWorld() {
  const dimensions = useSelector(getGameDimensions);
  const stage = useSelector(getCurrentStage);
  const hero = useSelector(getHero);

  const isBattleStarted = hero?.activeQuest.quest?.battleStarted;

  const CurrentStage = useMemo(() => {
    if (stage === "quests" || isBattleStarted) return <Quests />;
    if (stage === "portals") return <Portals />;
    if (stage === "hero") return <Hero />;
    if (stage === "temple") return <Temple />;
    if (stage === "merchants") return <Merchants />;
    if (stage === "trainers") return <Trainers />;
    return <></>;
  }, [stage, isBattleStarted]);

  return (
    <Container
      scale={[dimensions.scaleW, dimensions.scaleH]}
      position={[350 * dimensions.scaleW, 0]}
      interactive={true}
    >
      {CurrentStage}
    </Container>
  );
}

export default GameWorld;