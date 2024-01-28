import { useState } from "react"; 
import { Container, Sprite } from '@pixi/react';

import TavernBg from "../../../assets/images/game-world/tavern.jpg";
import SelectQuest from "./components/quests/SelectQuest";
import { useSelector } from "react-redux";
import { getHero } from "../../../redux/reducers/gameSlice";
import QuestBattle from "../../components/quests/QuestBattle";
import NpcLabels from "./components/tavern-components/NpcLabels";
import DungeonNpc from "./components/dungeon/DungeonNpc";
import QuestProgress from "../../components/quests/QuestProgress";
import DungeonBattle from "../dungeon-battle/DungeonBattle";

function Tavern() {
    const [selectedNpc, setSelectedNpc] = useState("");
    
    const hero = useSelector(getHero)!;

    const realmDungeon = hero.dungeons.find(
      (dungeon) => dungeon.realm === hero.realms.currentRealm
    )!;

    if (hero?.activeQuest.quest?.battleStarted)
      return <QuestBattle hero={hero} />;

    if (hero?.activeQuest.quest !== null) return <QuestProgress hero={hero} />;

    if (realmDungeon?.battle.isBattleStarted) return <DungeonBattle hero={hero} realmDungeon={realmDungeon} />;


    return (
      <Container position={[0, 0]}>
        <Sprite image={TavernBg} width={1316} height={935} />

        {selectedNpc === "" && <NpcLabels setCurrentNpc={setSelectedNpc} />}

        {selectedNpc === "traveller" && (
          <SelectQuest hero={hero} setCurrentNpc={setSelectedNpc} />
        )}

        {selectedNpc === "trophy" && (
          <DungeonNpc
            hero={hero}
            setCurrentNpc={setSelectedNpc}
            realmDungeon={realmDungeon}
          />
        )}
      </Container>
    );
}

export default Tavern;