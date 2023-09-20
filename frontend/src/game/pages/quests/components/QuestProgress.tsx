import { useEffect, useState} from 'react';
import { Container, Sprite, Text } from "@pixi/react";
import { TextStyle } from "pixi.js"
import QuestProgressBackground from "../../../../assets/images/game-world/questProgress.png"
import secondsRemaining from '../../../../utils/calculations/secondsRemaining';
import secondsToTime from '../../../../utils/parsing-data/secondsToTime';
import CancelBtn from "../../../../assets/images/cancelbtn.png";
import EnterBtn from "../../../../assets/images/enterbtn.png";
import { clearActiveQuest, startQuestBattle } from '../../../../client/appClient';
import { setHero } from '../../../../redux/reducers/gameSlice';
import { useDispatch } from 'react-redux';
import fetchHero from '../../../../utils/fetchers/fetchHero';

const isQuestReady = (questTime: string) => {
  const questDate = new Date(questTime);
  const now = new Date();
  if (now > questDate) return true;
  return false;
};


function QuestProgress({ activeQuest }: any) {
  const [futureTime, setFutureTime] = useState<any>(null);
  const [timeRemaining, setTimeRemaining] = useState<any>(null);

  const dispatch = useDispatch();

  const updateHero = (data: any) => {
    dispatch(setHero(data));
  };

  const setFTime = () => {
    const timeQuestStarted = new Date(activeQuest.timeStarted);
    timeQuestStarted.setSeconds(
      timeQuestStarted.getSeconds() + activeQuest.quest.duration
    );
    const isoString = timeQuestStarted.toISOString();
    setFutureTime(isoString);
  };

  function calculateRemainingTime() {
    return new Promise<void>((resolve) => {
      const checkTimeRemaining = () => {
        const secondsLeft = secondsRemaining(futureTime);
        if (secondsLeft < 0) {
          setTimeRemaining("00:00");
          resolve();
        } else {
          setTimeRemaining(secondsToTime(secondsLeft));
          setTimeout(checkTimeRemaining, 1000); // check again in 100ms
        }
      };
      checkTimeRemaining();
    });
  }

  const handleEnterBattleRequest = async () => {
    const response = await startQuestBattle();
    if (response.status !== 200) return false;
    fetchHero(updateHero);
    return true;
  };

  const enterBattle = async () => {
    const questReady = isQuestReady(activeQuest.timeStarted);
    if (questReady) {
      handleEnterBattleRequest();
    }
  };

  const handleCancelQuest = async () => {
    const response = await clearActiveQuest();
    if (response.status !== 200) return console.log(response.data);
    fetchHero(updateHero);
  };

  useEffect(() => {
    setFTime();
    if (futureTime !== null) calculateRemainingTime();
  }, [futureTime]);

  return (
    <Container position={[0, 0]}>
      <Sprite image={QuestProgressBackground} width={1316} height={935} />
      <Text
        anchor={0.5}
        x={1316 / 2}
        y={100}
        text={timeRemaining === "00:00" ? "QUEST READY" : "QUEST IN PROGRESS"}
        style={
          new TextStyle({
            align: "center",
            fontFamily: "Fondamento",
            fontSize: 56,
            fill: ["#C02E07"],
            dropShadow: true,
          })
        }
      />
      {timeRemaining !== null && timeRemaining !== "00:00" && (
        <Text
          anchor={0.5}
          x={1316 / 2}
          y={180}
          text={timeRemaining}
          style={
            new TextStyle({
              align: "center",
              fontFamily: "MedievalSharp",
              fontSize: 46,
              fill: ["#BCBCBC"],
              dropShadow: true,
            })
          }
        />
      )}
      {timeRemaining !== "00:00" && (
        <Sprite
          image={CancelBtn}
          width={150}
          height={150}
          anchor={0.5}
          x={1316 / 2}
          y={850}
          cursor={"pointer"}
          interactive={true}
          onclick={handleCancelQuest}
        />
      )}
      {timeRemaining === "00:00" && (
        <Sprite
          image={EnterBtn}
          width={150}
          height={150}
          anchor={0.5}
          x={1316 / 2}
          y={850}
          cursor={"pointer"}
          interactive={true}
          onclick={enterBattle}
        />
      )}
    </Container>
  );
}

export default QuestProgress;