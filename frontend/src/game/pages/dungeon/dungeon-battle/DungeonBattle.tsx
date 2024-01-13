import { useState, useEffect } from "react";
import { ICharacter, IDungeon } from '../../../../interfaces/MainInterface';
import { setHero } from "../../../../redux/reducers/gameSlice";
import { useDispatch } from "react-redux";
import fetchHero from "../../../../utils/fetchers/fetchHero";
import { Container, Text, TilingSprite } from "@pixi/react";
import Bar from "../../../components/battle/Bar";
import Portrait from "../../../components/battle/Portrait";
import BattleStats from "../../../components/battle/BattleStats";
import { TextStyle } from "pixi.js";
import CombatActions from "../../../components/battle/CombatActions";
import CombatLogs from "../../../components/battle/CombatLogs";
import BattleEndPopup from "../../../components/battle/BattleEndPopup";
import BgPattern from "../../../../assets/images/dark_wall.png";
import { dungeonBattleEnd, dungeonEnemyTurn } from "../../../../client/appClient";
import displayError from "../../../../utils/notifications/errors";
import { Text as AnimatedText } from "@pixi/react-animated";
import { Spring } from "react-spring";

interface IDungeonBattle {
  hero: ICharacter;
  realmDungeon: IDungeon;
}

const DamageOutput = ({ damageOutputInfo, setDamageOutputInfo }: any) => {
  const yPosition = damageOutputInfo?.who === 1 ? 380 : -15;

  const style = new TextStyle({
    align: "center",
    fontFamily: "Almendra",
    fontSize: 26,
    fontWeight: "700",
    fill: damageOutputInfo?.damage === "HEALED" ? "#2fa019" : "#BC330C",
  });

  if (damageOutputInfo === null) return null;

  return (
    <Container position={[500, yPosition]}>
      <Spring
        from={{
          x: 250 / 2,
          y: 120,
        }}
        to={{
          x: 250 / 2,
          y: 90,
        }}
        onRest={() =>
          setTimeout(() => {
            setDamageOutputInfo(null);
          }, 350)
        }
        config={{ friction: 12 }}
      >
        {(props: any) => {
          return (
            <AnimatedText
              isSprite={true}
              text={damageOutputInfo?.text}
              anchor={0.5}
              style={style}
              {...props}
            />
          );
        }}
      </Spring>
    </Container>
  );
};

function DungeonBattle({ hero, realmDungeon }: IDungeonBattle) {
  const [battleWinner, setBattleWinner] = useState<1 | 2 | null>(null);
  const enemy = realmDungeon.battle.enemy;
  const [enemyOutput, setEnemyOutput] = useState<{text: string; who: number, damage: string} | null>(null);
  const [heroOutput, setHeroOutput] = useState<{text: string; who: number, damage: string} | null>(null);

  const dispatch = useDispatch();

  const updateHero = (data: any) => {
    dispatch(setHero(data));
  };

  const handleEnemyTurn = async () => {
    const response = await dungeonEnemyTurn();
    if (response.status !== 200) return displayError(dispatch, response);
    setEnemyOutput(response.data);
    fetchHero(updateHero);
  };

  const handleBattleEnd = async () => {
    const response = await dungeonBattleEnd();
    if (response.status !== 200) return displayError(dispatch, response);
    fetchHero(updateHero);
  };

  useEffect(() => {
    if (realmDungeon!.battle.battleWinner) {
      setBattleWinner(realmDungeon!.battle.battleWinner);
    } else if (realmDungeon!.battle.whosTurn === 2) {
      setTimeout(() => {
        handleEnemyTurn();
      }, 1200);
    }
  }, [hero]);

  const MobSection = () => {
    return (
      <Container position={[50, 100]}>
        <Bar
          position={[0, 0]}
          name={"Hit points"}
          value={enemy!.health}
          maxValue={enemy!.maxHealth}
        />
        {/* <BattleStats
          statistics={enemy!.statistics}
          position={[0, 150]}
        /> */}
        <Portrait
          position={[450, 0]}
          name={enemy!.name}
          level={enemy!.level}
          img={enemy!.avatar}
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
          value={hero.updatedValues.health}
          maxValue={hero.updatedValues.maxHealth}
        />
        <Bar
          position={[0, 70]}
          name={"Mana"}
          value={hero.updatedValues.mana}
          maxValue={hero.updatedValues.maxMana}
        />
        <BattleStats
          statistics={hero.updatedValues.statistics}
          armor={hero.updatedValues.armor}
          position={[0, 150]}
        />
        <Portrait
          position={[450, 0]}
          name={"You"}
          level={hero.progression.level}
          img={hero.avatar}
        />
      </Container>
    );
  };

  const Turn = () => {
    const whosTurn =
      realmDungeon!.battle.whosTurn === 1
        ? "You"
        : enemy!.name;

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
  };

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
      <DamageOutput
        damageOutputInfo={heroOutput}
        setDamageOutputInfo={setHeroOutput}
      />
      <DamageOutput
        damageOutputInfo={enemyOutput}
        setDamageOutputInfo={setEnemyOutput}
      />
      <CombatLogs logs={realmDungeon.battle.textLogs} />
      <CombatActions
        hero={hero}
        battleType="DUNGEON"
        setDamageOutputInfo={setHeroOutput}
      />
      {battleWinner && (
        <BattleEndPopup
          battleWinner={battleWinner}
          rewards={enemy?.rewards!}
          handleBattleEnd={handleBattleEnd}
        />
      )}
    </Container>
  );
}

export default DungeonBattle;