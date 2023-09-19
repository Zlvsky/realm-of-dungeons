import { useState, useCallback } from "react";
import { Container, Sprite, Text, Graphics } from "@pixi/react";
import QuestsBg from "../../../.././assets/images/game-world/quests.png";
import HourglassIcon from "../../../../assets/images/icons/gui/hourglass.png"
import GoldIcon from "../../../../assets/images/icons/gui/gold-icon.png"
import XpIcon from "../../../../assets/images/icons/gui/xp.png";
import AcceptBtn from "../../../../assets/images/acceptbtn.png";
import { setHero } from "../../../../redux/reducers/gameSlice";

import { TextStyle } from "pixi.js";
import QuestTabs from "./QuestTabs";
import secondsToTime from "../../../../utils/parsing-data/secondsToTime";
import { updateActiveQuest } from "../../../../client/appClient";
import fetchHero from "../../../../utils/fetchers/fetchHero";
import { connect } from "react-redux";
import IconWithText from "../../../../components/common/text/IconWithText";

function SelectQuest({ questsData, updateHero }: any) {
  const [selectedQuest, setSelectedQuest] = useState(1);

  const handleAcceptQuest = async () => {
    const response = await updateActiveQuest({
      questId: questsData[selectedQuest]._id,
    });
    if (response.status !== 200) return console.log(response.data);
    fetchHero(updateHero);
  };

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
        anchor={0.5}
        x={1316 / 2}
        y={100}
        text={"AVAILABLE QUESTS"}
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
            fontFamily: "Almendra",
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
            fontFamily: "MedievalSharp",
            fontSize: 26,
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
            fontFamily: "MedievalSharp",
            fontSize: 26,
            fill: ["#BCBCBC"],
            wordWrap: true,
            wordWrapWidth: 610,
          })
        }
      />
      <IconWithText
        text={questsData[selectedQuest].rewards.gold}
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

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateHero: (data: any) => dispatch(setHero(data)),
  };
};

export default connect(null, mapDispatchToProps)(SelectQuest);