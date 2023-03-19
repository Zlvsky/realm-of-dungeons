import React, { useState, useCallback } from "react";
import { Stage, Container, Sprite, Text, Graphics } from "@pixi/react";
import QuestsBg from "../../../.././assets/images/game-world/quests.png";
import HourglassIcon from "../../../../assets/images/icons/gui/hourglass.png"
import GoldIcon from "../../../../assets/images/icons/gui/gold-icon.png"
import XpIcon from "../../../../assets/images/icons/gui/xp.png";
import AcceptBtn from "../../../../assets/images/acceptbtn.png";


import { TextStyle } from "pixi.js";
import QuestTabs from "./QuestTabs";
import secondsToTime from "../../../../utils/parsing-data/secondsToTime";

const IconWithText = ( {text, image, position}: any ) => {
  return (
    <Container position={position}>
      <Sprite image={image} width={50} height={50} x={0} y={-6} />
      <Text
        text={text}
        x={60}
        y={6}
        style={
          new TextStyle({
            align: "center",
            fontFamily: "sans-serif",
            fontSize: 24,
            fill: ["#BCBCBC"],
            wordWrap: true,
            wordWrapWidth: 610,
          })
        }
      />
    </Container>
  );
}

function SelectQuest({ questsData }: any) {
  const [selectedQuest, setSelectedQuest] = useState(1);

  const handleAcceptQuest = () => {
    console.log("accepted");
    
  }

  const questFrame = useCallback((g: any) => {
    g.clear();
    g.beginFill(0x29221c, 0.9);
    g.lineStyle(4, 0x29221c, 1);
    g.moveTo(250, 50);
    g.lineTo(250, 50);
    g.lineTo(1065, 50);
    g.lineTo(1065, 900);
    g.lineTo(250, 900);
    g.lineTo(250, 50);
    g.endFill();
  }, []);
  return (
    <Container position={[0, 0]}>
      <Sprite image={QuestsBg} width={1316} height={935} />
      <Graphics draw={questFrame} zIndex={0} />
      <Text
        x={400}
        y={72}
        text={"AVAILABLE QUESTS"}
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
      <QuestTabs
        selectedQuest={selectedQuest}
        setSelectedQuest={setSelectedQuest}
      />
      <Text
        x={350}
        y={300}
        text={questsData[selectedQuest].description}
        style={
          new TextStyle({
            align: "center",
            fontFamily: "sans-serif",
            fontSize: 24,
            fill: ["#BCBCBC"],
            wordWrap: true,
            wordWrapWidth: 610,
          })
        }
      />
      <Text
        x={350}
        y={500}
        text={"TIME: "}
        style={
          new TextStyle({
            align: "center",
            fontFamily: "sans-serif",
            fontSize: 24,
            fill: ["#BCBCBC"],
            wordWrap: true,
            wordWrapWidth: 610,
          })
        }
      />
      <IconWithText
        text={secondsToTime(questsData[selectedQuest].duration)}
        image={HourglassIcon}
        position={[350, 550]}
      />
      <Text
        x={350}
        y={630}
        text={"REWARDS: "}
        style={
          new TextStyle({
            align: "center",
            fontFamily: "sans-serif",
            fontSize: 24,
            fill: ["#BCBCBC"],
            wordWrap: true,
            wordWrapWidth: 610,
          })
        }
      />
      <IconWithText
        text={questsData[selectedQuest].rewards.gold / 100}
        image={GoldIcon}
        position={[350, 680]}
      />
      <IconWithText
        text={questsData[selectedQuest].rewards.xp}
        image={XpIcon}
        position={[350, 750]}
      />
      <Sprite
        image={AcceptBtn}
        width={150}
        height={150}
        x={575}
        y={780}
        cursor={"pointer"}
        interactive={true}
        onclick={handleAcceptQuest}
      />
    </Container>
  );
}

export default SelectQuest;