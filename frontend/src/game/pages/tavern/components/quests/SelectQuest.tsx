import { useState } from 'react';
import { updateActiveQuest } from '../../../../../client/appClient';
import { ICharacter } from '../../../../../interfaces/MainInterface';
import NpcPopup from '../../../../components/ui/NpcPopup';
import fetchHero from '../../../../../utils/fetchers/fetchHero';
import displayError from '../../../../../utils/notifications/errors';
import { useDispatch } from 'react-redux';
import { setHero } from '../../../../../redux/reducers/gameSlice';
import QuestTabs from '../../../../components/quests/QuestTabs';
import { Container, Sprite, Text } from '@pixi/react';
import { TextStyle } from 'pixi.js';
import IconWithText from '../../../../../components/common/text/IconWithText';
import secondsToTime from '../../../../../utils/parsing-data/secondsToTime';
import ItemLoot from '../../../../components/quests/ItemLoot';

import HourglassIcon from "../../../../../assets/images/icons/gui/hourglass.png";
import GoldIcon from "../../../../../assets/images/icons/gui/gold-icon.png";
import XpIcon from "../../../../../assets/images/icons/gui/xp.png";
import AcceptBtn from "../../../../../assets/images/acceptbtn.png";


interface ISelectQuest {
  hero: ICharacter;
  setCurrentNpc: Function;
}

const halfWidth = (1180 / 2) - 60;

const iconWithTextStyle = {
  align: "center",
  fontFamily: "MedievalSharp",
  fontSize: 24,
  fill: ["#BCBCBC"],
  wordWrap: true,
  wordWrapWidth: 610,
};

function SelectQuest({ hero, setCurrentNpc }: ISelectQuest) {
  const [selectedQuest, setSelectedQuest] = useState(1);
  
  const dispatch = useDispatch();

  const updateHero = (data: any) => {
    dispatch(setHero(data));
  };

  const questsData: any = hero.availableQuests;
  const currentRealm = hero.realms.currentRealm;

  const availableQuestsIndex = questsData.findIndex(
    (el: any) => el.realm === currentRealm
  )!;

  const currentQuestsData = questsData[availableQuestsIndex].quests;
  

  const handleAcceptQuest = async () => {
    const response = await updateActiveQuest({
      questId: currentQuestsData[selectedQuest]._id,
    });
    if (response.status !== 200) return displayError(dispatch, response);
    fetchHero(updateHero);
  };

  return (
    <NpcPopup
      setTrigger={setCurrentNpc}
      npc={"traveller.jpg"}
      title={"Embark on a quest"}
      description={
        "Excuse me, adventurer! I couldn't help but notice your formidable presence.\nAre you perhaps seeking an opportunity to prove your valor and aid a humble soul in need?"
      }
    >
      <>
        <QuestTabs
          selectedQuest={selectedQuest}
          setSelectedQuest={setSelectedQuest}
        />
        <Text
          x={halfWidth}
          y={210}
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
          x={halfWidth}
          y={260}
          anchor={[0.5, 0]}
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
        <Container position={[0, -100]}>
          <Text
            x={230}
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
            position={[230, 550]}
            textStyle={iconWithTextStyle}
          />
          <Text
            x={430}
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
            position={[430, 550]}
            textStyle={iconWithTextStyle}
          />
          <IconWithText
            text={currentQuestsData[selectedQuest].rewards.xp}
            image={XpIcon}
            position={[600, 550]}
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
          x={halfWidth}
          anchor={[0.5, 0]}
          y={550}
          cursor={"pointer"}
          interactive={true}
          onpointerdown={handleAcceptQuest}
        />
      </>
    </NpcPopup>
  );
}

export default SelectQuest;