import { useEffect, useState } from "react";
import { Container, Text, TilingSprite } from "@pixi/react";
import { TextStyle } from "pixi.js";
import BgPattern from "../../../../../assets/images/dark_wall.png";
import BattleStats from "../../../../components/battle/BattleStats";
import Bar from "../../../../components/battle/Bar";
import Portrait from "../../../../components/battle/Portrait";
import CombatActions from "../../../../components/battle/CombatActions";
import CombatLogs from "../../../../components/battle/CombatLogs";
import { questEnemyTurn } from "../../../../../client/appClient";
import { setHero } from "../../../../../redux/reducers/gameSlice";
import { useDispatch } from "react-redux";
import fetchHero from "../../../../../utils/fetchers/fetchHero";
import BattleEndPopup from "../../../../components/battle/BattleEndPopup";
import { questBattleEndService } from "../../../../../client/services/game/quests/questBattleEndService";
import { ICharacter } from "../../../../../interfaces/MainInterface";
import displayError from "../../../../../utils/notifications/errors";
import { Text as AnimatedText } from "@pixi/react-animated";
import { Spring, animated } from "react-spring";
interface IQuestBattle {
  hero: ICharacter;
}

function QuestBattle({ hero }: IQuestBattle) {
  const [battleWinner, setBattleWinner] = useState<1 | 2 | null>(null);

  const [visible, setVisible] = useState(true);

  // const { y } = useSpring({
  //   y: visible ? -20 : -50, // Adjust these values for the desired animation
  //   onRest: () => setVisible(false), // Hide the text after the animation is complete
  // });

  const dispatch = useDispatch();

  const updateHero = (data: any) => {
    dispatch(setHero(data));
  };

  const handleEnemyTurn = async () => {
    const response = await questEnemyTurn();
    if (response.status !== 200) return displayError(dispatch, response);
    fetchHero(updateHero);
  };

  const handleBattleEnd = async () => {
    const response = await questBattleEndService();
    if (response.status !== 200) return displayError(dispatch, response);
    fetchHero(updateHero);
  };

  useEffect(() => {
    if (hero.activeQuest.quest!.battleWinner) {
      setBattleWinner(hero.activeQuest.quest!.battleWinner);
    } else if (hero.activeQuest.quest!.whosTurn === 2) {
      setTimeout(() => {
        handleEnemyTurn();
      }, 1000);
    }
  }, [hero]);

  const MobSection = () => {
    return (
      <Container position={[50, 100]}>
        <Bar
          position={[0, 0]}
          name={"Hit points"}
          value={hero.activeQuest.enemy!.health}
          maxValue={hero.activeQuest.enemy!.maxHealth}
        />
        {/* <BattleStats
          statistics={hero.activeQuest.enemy!.statistics}
          position={[0, 150]}
        /> */}
        <Portrait
          position={[450, 0]}
          name={hero.activeQuest.enemy!.name}
          level={hero.activeQuest.enemy!.level}
          img={hero.activeQuest.enemy!.avatar}
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

  const DamageOutput = () => {
    const [visible, setVisible] = useState(true);

    return (
      <Container position={[500, 380]}>
        <Spring
          from={{ x: 250 / 2, y: 120 }}
          to={{ x: 250 / 2, y: 90 }}
          onRest={() => setVisible(false)}
        >
          {(props: any) => (
            <AnimatedText
              text={`MISSED`}
              {...props}
              visible={visible}
              anchor={0.5}
            />
          )}
        </Spring>
      </Container>
    );
  };
  /*
style={
                new TextStyle({
                  align: "center",
                  fontFamily: "Almendra",
                  fontSize: 26,
                  fontWeight: "700",
                  fill: ["#BC330C"],
                })
              }
*/
  const Turn = () => {
    const whosTurn =
      hero?.activeQuest.quest!.whosTurn === 1
        ? "You"
        : hero?.activeQuest.enemy!.name;

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
      {/* <DamageOutput /> */}
      <CombatActions hero={hero} battleType={"QUEST"} />
      <CombatLogs logs={hero.activeQuest.textLogs} />
      {battleWinner && (
        <BattleEndPopup
          battleWinner={battleWinner}
          rewards={hero.activeQuest.quest!.rewards}
          handleBattleEnd={handleBattleEnd}
        />
      )}
    </Container>
  );
}

export default QuestBattle;