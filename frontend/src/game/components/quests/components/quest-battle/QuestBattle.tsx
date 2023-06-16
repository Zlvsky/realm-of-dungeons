import { useEffect, useState } from "react";
import { Container, Text, Graphics, TilingSprite } from "@pixi/react";
import { TextStyle } from "pixi.js";
import BgPattern from "../../../../../assets/images/dark_wall.png";
import BattleStats from "./components/BattleStats";
import Bar from "./components/Bar";
import Portrait from "./components/Portrait";
import CombatActions from "./components/CombatActions";
import CombatLogs from "./components/CombatLogs";

const mockedMob = {
  avatar: "https://i.ibb.co/LgfgW8D/mage.png",
  statistics: {
    "strength": 8,
    "dexterity": 6,
    "condition": 9,
    "intelligence": 14,
    "wisdom": 12,
    "charisma": 8
},
  health: 180,
  maxHealth: 200,
  level: 1,
  name: "Dark mage",
  minDamage: 10,
  maxDamage: 20
};

function QuestBattle({ hero }: any) {

  const MobSection = () => {
    return (
      <Container position={[50, 100]}>
        <Bar
          position={[0, 0]}
          name={"Hit points"}
          value={mockedMob.health}
          maxValue={mockedMob.maxHealth}
        />
        <BattleStats statistics={mockedMob.statistics} position={[0, 150]} />
        <Portrait
          position={[450, 0]}
          name={mockedMob.name}
          level={mockedMob.level}
          img={mockedMob.avatar}
        />
      </Container>
    );
  };

    const HeroSection = () => {
        return (
          <Container position={[50, 500]}>
            <Bar
              position={[0, 0]}
              name={"Hit points"}
              value={hero.heroValues.health - 50}
              maxValue={hero.heroValues.health}
            />
            <Bar
              position={[0, 70]}
              name={"Mana"}
              value={hero.heroValues.mana - 50}
              maxValue={hero.heroValues.mana}
            />
            <BattleStats
              statistics={hero.heroValuesWithItems.statistics}
              position={[0, 150]}
            />
            <Portrait position={[450, 0]} name={"You"} level={hero.progression.level} img={hero.avatar}/>
          </Container>
        );
    }


    return (
      <Container position={[0, 0]}>
        <TilingSprite
          image={BgPattern}
          width={1315}
          height={935}
          tilePosition={{ x: 0, y: 0 }}
        />
        <MobSection />
        <HeroSection />
        <CombatActions />
        <CombatLogs />
      </Container>
    );
}

export default QuestBattle;