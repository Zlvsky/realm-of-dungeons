import React, { useEffect, useState} from 'react';
import { Container, Sprite, Text, Graphics } from "@pixi/react";
import { VideoResource, Texture, TextStyle } from "pixi.js"
import QuestProgressBackground from "../../../../assets/images/game-world/questProgress.png"
import secondsRemaining from '../../../../utils/calculations/secondsRemaining';
import secondsToTime from '../../../../utils/parsing-data/secondsToTime';
import CancelBtn from "../../../../assets/images/cancelbtn.png";
import { clearActiveQuest } from '../../../../client/appClient';
import { setHero } from '../../../../redux/reducers/gameSlice';
import { connect } from 'react-redux';
import fetchHero from '../../../../utils/fetchers/fetchHero';

function QuestProgress({ activeQuest, updateHero }: any) {
  const [futureTime, setFutureTime] = useState<any>(null);
  const [timeRemaining, setTimeRemaining] = useState<any>(null);

  const setFTime = () => {
    const timeQuestStarted = new Date(activeQuest.timeStarted);
    timeQuestStarted.setSeconds(timeQuestStarted.getSeconds() + activeQuest.quest.duration);
    const isoString = timeQuestStarted.toISOString();
    setFutureTime(isoString);
  };

  function calculateRemainingTime() {
    return new Promise<void>((resolve) => {
      const checkTimeRemaining = () => {
        const secondsLeft = secondsRemaining(futureTime);
        if (secondsLeft < 0) {
          resolve();
        } else {
          setTimeRemaining(secondsToTime(secondsLeft));
          setTimeout(checkTimeRemaining, 1000); // check again in 100ms
        }
      };
      checkTimeRemaining();
    });
  }

  const handleCancelQuest = async () => {
    const response = await clearActiveQuest();
    if (response.status !== 200) return console.log(response.data);
    fetchHero(updateHero);
    console.log("success,", response.data);
  };

  useEffect(() => {
    setFTime();
    if (futureTime !== null) calculateRemainingTime();
  }, [futureTime]);

  return (
    <Container position={[0, 0]}>
      <Sprite image={QuestProgressBackground} width={1316} height={935} />
      <Text
        x={350}
        y={72}
        text={"QUEST IN PROGRESS"}
        style={
          new TextStyle({
            align: "center",
            fontFamily: "sans-serif",
            fontSize: 56,
            fill: ["#C02E07"],
            dropShadow: true,
          })
        }
      />
      {timeRemaining !== null && (
        <Text
          x={570}
          y={160}
          text={timeRemaining}
          style={
            new TextStyle({
              align: "center",
              fontFamily: "sans-serif",
              fontSize: 46,
              fill: ["#BCBCBC"],
              dropShadow: true,
            })
          }
        />
      )}
      <Sprite
        image={CancelBtn}
        width={150}
        height={150}
        x={540}
        y={780}
        cursor={"pointer"}
        interactive={true}
        onclick={handleCancelQuest}
      />
    </Container>
  );
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateHero: (data: any) => dispatch(setHero(data)),
  };
};

export default connect(null,mapDispatchToProps)(QuestProgress);