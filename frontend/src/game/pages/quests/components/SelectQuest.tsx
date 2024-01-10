import { useState, useCallback } from "react";
import { Container, Sprite, Text, Graphics } from "@pixi/react";
import QuestsBg from "../../../.././assets/images/game-world/quests.png";
import CryptBg from "../../../.././assets/images/game-world/realms/crypt/crypt-tavern.jpg";
import CavernsBg from "../../../.././assets/images/game-world/realms/caverns/caverns-tavern.jpg";
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
import { useDispatch } from "react-redux";
import IconWithText from "../../../../components/common/text/IconWithText";
import displayError from "../../../../utils/notifications/errors";

const iconWithTextStyle = {
  align: "center",
  fontFamily: "MedievalSharp",
  fontSize: 24,
  fill: ["#BCBCBC"],
  wordWrap: true,
  wordWrapWidth: 610,
};

const getRealmBackground = (realm: string) => {
  switch (realm) {
    case "CAVERNS":
      return CavernsBg; 
    case "CRYPT":
      return CryptBg; 
    default:
      return QuestsBg;
  }
}

function SelectQuest({ hero }: any) {
  const [selectedQuest, setSelectedQuest] = useState(1);

  const questsData = hero.availableQuests;
  const currentRealm = hero.realms.currentRealm;

  const availableQuestsIndex = questsData.findIndex(
    (el: any) => el.realm === currentRealm
  )!;

  const currentQuestsData = questsData[availableQuestsIndex].quests;
  
  const dispatch = useDispatch();

  const updateHero = (data: any) => {
    dispatch(setHero(data));
  };

  const handleAcceptQuest = async () => {
    const response = await updateActiveQuest({
      questId: currentQuestsData[selectedQuest]._id,
    });
    if (response.status !== 200) return displayError(dispatch, response);
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
      <Sprite
        image={getRealmBackground(currentRealm)}
        width={1316}
        height={935}
      />
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
        x={1316 / 2}
        y={250}
        anchor={[0.5, 0]}
        text={currentQuestsData[selectedQuest].title}
        style={
          new TextStyle({
            align: "center",
            fontFamily: "Almendra",
            fontSize: 29,
            fill: ["#dfdfdf"],
          })
        }
      />
      <Text
        x={350}
        y={300}
        text={currentQuestsData[selectedQuest].description}
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
        text={secondsToTime(currentQuestsData[selectedQuest].duration)}
        image={HourglassIcon}
        position={[350, 550]}
        textStyle={iconWithTextStyle}
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
        text={currentQuestsData[selectedQuest].rewards.gold}
        image={GoldIcon}
        position={[350, 680]}
        textStyle={iconWithTextStyle}
      />
      <IconWithText
        text={currentQuestsData[selectedQuest].rewards.xp}
        image={XpIcon}
        position={[350, 750]}
        textStyle={iconWithTextStyle}
      />
      {currentQuestsData[selectedQuest].rewards?.item && (
        <IconWithText
          text={currentQuestsData[selectedQuest].rewards?.item.name}
          image={currentQuestsData[selectedQuest].rewards?.item.image}
          position={[500, 715]}
          imageWidth={60}
          imageHeight={60}
          imageY={-10}
          textStyle={iconWithTextStyle}
        />
      )}

      <Sprite
        image={AcceptBtn}
        width={150}
        height={150}
        x={575}
        y={780}
        cursor={"pointer"}
        interactive={true}
        onpointerdown={handleAcceptQuest}
      />
    </Container>
  );
}

export default SelectQuest;