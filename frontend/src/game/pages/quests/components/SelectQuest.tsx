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
import ItemLoot from "./select-quest/ItemLoot";
import HeroStatusBars from "./select-quest/HeroStatusBars";

const iconWithTextStyle = {
  align: "center",
  fontFamily: "MedievalSharp",
  fontSize: 24,
  fill: ["#BCBCBC"],
  wordWrap: true,
  wordWrapWidth: 610,
};

const canvasWidth = 1316;
const canvasHeight = 937;
const rectWidth = 815;
const rectHeight = 740;

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
  
  const startX = (canvasWidth - rectWidth) / 2;
  const startY = (canvasHeight - rectHeight) / 2;

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

    g.moveTo(startX, 50);
    g.lineTo(startX + rectWidth, 50);
    g.lineTo(startX + rectWidth, rectHeight);
    g.lineTo(startX, rectHeight );
    g.lineTo(startX, 50);

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
      <Text
        anchor={[0.5, 0]}
        x={1316 / 2}
        y={130}
        text={"Current realm: " + currentRealm}
        style={
          new TextStyle({
            align: "center",
            fontFamily: "Fondamento",
            fontSize: 34,
            fill: ["#BCBCBC"],
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
        y={270}
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
        y={320}
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
      <Container position={[0, -30]}>
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
          x={550}
          y={500}
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
          position={[550, 550]}
          textStyle={iconWithTextStyle}
        />
        <IconWithText
          text={currentQuestsData[selectedQuest].rewards.xp}
          image={XpIcon}
          position={[720, 550]}
          textStyle={iconWithTextStyle}
        />
        {currentQuestsData[selectedQuest].rewards?.item && (
          <ItemLoot item={currentQuestsData[selectedQuest].rewards?.item} />
        )}
      </Container>

      <Sprite
        image={AcceptBtn}
        width={150}
        height={150}
        x={1316 / 2}
        anchor={[0.5, 0]}
        y={600}
        cursor={"pointer"}
        interactive={true}
        onpointerdown={handleAcceptQuest}
      />
      <HeroStatusBars hero={hero} />
    </Container>
  );
}

export default SelectQuest;