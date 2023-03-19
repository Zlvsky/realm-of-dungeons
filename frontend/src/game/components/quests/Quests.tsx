import React, { useState, useEffect } from "react";
import { Container } from "@pixi/react";
import { useSelector } from "react-redux";
import { getHero } from "../../../redux/reducers/gameSlice";
import SelectQuest from "./components/SelectQuest";

const mockedData = [
  {
    id: 1,
    description:
      "In this idle MMO game, players explore challenging dungeons, level up their characters, and acquire powerful gear. With minimal active gameplay required, it's perfect for those seeking a relaxing but rewarding gaming experience",
    duration: 180,
    rewards: {
      gold: 152,
      xp: 50,
    },
  },
  {
    id: 2,
    description:
      "In this idle MMO game, players explore challenging dungeons, level up their characters, and acquire powerful gear. With minimal active gameplay required, it's perfect for those seeking a relaxing but rewarding gaming experience",
    duration: 240,
    rewards: {
      gold: 132,
      xp: 40,
    },
  },
  {
    id: 3,
    description:
      "In this idle MMO game, players explore challenging dungeons, level up their characters, and acquire powerful gear. With minimal active gameplay required, it's perfect for those seeking a relaxing but rewarding gaming experience",
    duration: 120,
    rewards: {
      gold: 252,
      xp: 20,
    },
  },
];


function Quests() {
  const [questsData, setQuestsData] = useState<any>(null);
  const hero = useSelector(getHero);

  useEffect(() => {
    const getQuestsData = async () => {
      setQuestsData(mockedData);
    }
    if (hero?.activeQuest === null) getQuestsData();
  }, [])
  
  console.log(hero);

  return (
    <Container position={[0, 2]}>
      {hero?.activeQuest === null && questsData !== null ? (
        <SelectQuest questsData={questsData} />
      ) : (
        <></>
      )}
    </Container>
  );

}

export default Quests;
