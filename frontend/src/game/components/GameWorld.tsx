import { Container } from "@pixi/react";
import { useSelector } from 'react-redux';
import { getCurrentStage, getGameDimensions, getHero } from '../../redux/reducers/gameSlice';
import Hero from "../pages/hero/Hero";
import Temple from '../pages/temple/Temple';
import Merchants from "../pages/merchants/Merchants";
import { useMemo } from "react";
import Portals from "../pages/portals/Portals";
import Trainers from "../pages/trainers/Trainers";
import Ranking from "../pages/ranking/Ranking";
import Guild from "../pages/guild/Guild";
import Village from "../pages/village/Village";
import Tavern from "../pages/tavern/Tavern";

function GameWorld() {
  const dimensions = useSelector(getGameDimensions);
  const stage = useSelector(getCurrentStage);
  const hero = useSelector(getHero);

  const isQuestBattleStarted = hero?.activeQuest.quest?.battleStarted;
  
  const realmDungeon = hero?.dungeons.find(
    (dungeon) => dungeon?.realm === hero?.realms?.currentRealm
  );

  const isDungeonBattleStarted = realmDungeon?.battle?.isBattleStarted;

  const CurrentStage = useMemo(() => {
    if ((stage === "tavern" && !isDungeonBattleStarted) || isQuestBattleStarted) return <Tavern />;
    if ((stage === "tavern" && !isQuestBattleStarted) || isDungeonBattleStarted) return <Tavern />;
    if (stage === "village") return <Village />;
    if (stage === "elder") return <Village npc={"elder"} />;
    if (stage === "hero") return <Hero />;
    if (stage === "temple") return <Temple />;
    if (stage === "ranking") return <Ranking currentHeroId={hero?._id} />;
    if (stage === "merchants" || stage === "merchant_shop" ) return <Merchants />;
    if (stage === "trainers" || stage === "single_trainer") return <Trainers stage={stage} />;
    if (stage === "guild") return <Guild />;
    return <></>;
  }, [stage, isQuestBattleStarted]);

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