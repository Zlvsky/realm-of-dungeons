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
  console.log(hero)

  const MobSection = () => {
    return (
      <Container position={[50, 100]}>
        <Bar
          position={[0, 0]}
          name={"Hit points"}
          value={hero.activeQuest.enemy.health}
          maxValue={hero.activeQuest.enemy.maxHealth}
        />
        <BattleStats statistics={mockedMob.statistics} position={[0, 150]} />
        <Portrait
          position={[450, 0]}
          name={hero.activeQuest.enemy.name}
          level={hero.activeQuest.enemy.level}
          img={hero.activeQuest.enemy.avatar}
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
              value={hero.heroValues.currentHealth}
              maxValue={hero.heroValues.health}
            />
            <Bar
              position={[0, 70]}
              name={"Mana"}
              value={hero.heroValues.currentMana}
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

    const Turn = () => {
      const whosTurn = hero?.activeQuest.quest.whosTurn === 1 ? "You" : hero?.activeQuest.enemy.name;

      return (
        <Container position={[500, 380]}>
          <Text
            text={`Turn: ${whosTurn}`}
            y={50}
            x={250 / 2}
            anchor={0.5}
            style={
              new TextStyle({
                align: "center",
                fontFamily: "Almendra",
                fontSize: 30,
                fill: ["#BC330C"],
              })
            }
          />
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
        <Turn />
        <HeroSection />
        <CombatActions heroValues={hero.heroValuesWithItems} />
        <CombatLogs logs={hero.activeQuest.textLogs}/>
      </Container>
    );
}

export default QuestBattle;