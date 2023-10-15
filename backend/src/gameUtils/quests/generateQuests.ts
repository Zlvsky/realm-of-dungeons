import { TCurrentRealm } from "../../types/account/MainInterfaces";
import { getRandomQuests } from "./quests/getRandomQuest";

function getRandomNumberInRange(min: number, max: number, step: number) {
  var range = (max - min) / step;
  var randomSteps = Math.floor(Math.random() * range);
  var randomNumber = min + randomSteps * step;
  return parseFloat(randomNumber.toFixed(2));
}

const getMaxBaseXp = (realm: TCurrentRealm) => {
  switch (realm) {
    case "CAVERNS":
      return getRandomNumberInRange(10, 50, 1);
    case "CRYPT":
      return getRandomNumberInRange(50, 200, 1);
  }
};

const getRealmGoldReward = (realm: TCurrentRealm) => {
  switch (realm) {
    case "CAVERNS":
      return getRandomNumberInRange(0.5, 3, 0.25);
    case "CRYPT":
      return getRandomNumberInRange(2, 6, 0.25);
  }
};

export const generateXP = (realm: TCurrentRealm, questIndex: number) => {
  const baseXp = getMaxBaseXp(realm);
  const experience = baseXp * questIndex;
  return Math.round(experience);
};

export const generateGold = (realm: TCurrentRealm, questIndex: number) => {
  const baseGold = getRealmGoldReward(realm);
  const gold = baseGold * questIndex;
  return Math.round(gold * 20) / 20;
};

const generateQuest = (
  realm: TCurrentRealm,
  quest: { title: string; description: string; isBoss: boolean },
  questIndex: number,
  timeStamps: number[]
) => {
  const timeStampIndex = Math.round(Math.random() * (timeStamps.length - 1));
  const randomTimeStamp = timeStamps[timeStampIndex];
  const xp = generateXP(realm, questIndex);
  const gold = generateGold(realm, questIndex);
  return {
    title: quest.title,
    description: quest.description,
    duration: randomTimeStamp,
    rewards: {
      xp: xp,
      gold: gold,
    },
    battleStarted: false,
    isBoss: quest.isBoss,
  };
};

const generateQuests = (realm: TCurrentRealm, level: number) => {
  // generate quest for availableQuests realm
  const randomQuests = getRandomQuests(realm, level);
  const firstQuest = generateQuest(
    realm,
    randomQuests[0],
    0.5,
    [120, 180, 240]
  );
  const secondQuest = generateQuest(realm, randomQuests[1], 1, [300, 360, 420]);
  const thirdQuest = generateQuest(realm, randomQuests[2], 2, [840, 900, 960]);
  return [firstQuest, secondQuest, thirdQuest];
};

export default generateQuests;
