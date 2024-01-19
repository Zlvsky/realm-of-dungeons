import { TCurrentRealm } from "../../types/account/MainInterfaces";
import { generateItemReward } from "../items/generateItemReward";
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
      return getRandomNumberInRange(30, 70, 1);
    case "CRYPT":
      return getRandomNumberInRange(50, 300, 1);
  }
};

const getLevelXpBonus = (realm: TCurrentRealm, heroLevel: number) => {
  switch (realm) {
    case "CAVERNS":
      return 8 * heroLevel;
    case "CRYPT":
      return 15 * heroLevel;
  }
}

const getRealmGoldReward = (realm: TCurrentRealm) => {
  switch (realm) {
    case "CAVERNS":
      return getRandomNumberInRange(0.5, 3, 0.25);
    case "CRYPT":
      return getRandomNumberInRange(2, 6, 0.25);
  }
};

const getRealmItemPool = (realm: TCurrentRealm) => {
  switch (realm) {
    case "CAVERNS":
      return [
        // WEAPONS
        { itemId: 2401, dropChance: 8 },
        { itemId: 2402, dropChance: 3 },
        { itemId: 2101, dropChance: 8 },
        { itemId: 2102, dropChance: 3 },
        { itemId: 2501, dropChance: 7 },
        { itemId: 2502, dropChance: 3 },
        { itemId: 2201, dropChance: 6 },
        { itemId: 2202, dropChance: 3 },
        { itemId: 2301, dropChance: 7 },
        { itemId: 2302, dropChance: 3 },
        // CHESTS
        { itemId: 1301, dropChance: 7 },
        { itemId: 1303, dropChance: 3 },
        { itemId: 1305, dropChance: 2 },
        // LEGS
        { itemId: 1501, dropChance: 7 },
        { itemId: 1503, dropChance: 3 },
        { itemId: 1505, dropChance: 2 },
        // HEAD
        { itemId: 1101, dropChance: 3 },
        { itemId: 1103, dropChance: 5 },
        { itemId: 1105, dropChance: 3 },
      ];
    case "CRYPT":
      return [
        // WEAPONS
        { itemId: 2402, dropChance: 8 },
        { itemId: 2403, dropChance: 3 },
        { itemId: 2102, dropChance: 8 },
        { itemId: 2103, dropChance: 3 },
        { itemId: 2502, dropChance: 7 },
        { itemId: 2503, dropChance: 3 },
        { itemId: 2502, dropChance: 3 },
        { itemId: 2202, dropChance: 6 },
        { itemId: 2203, dropChance: 3 },
        { itemId: 2302, dropChance: 7 },
        { itemId: 2303, dropChance: 3 },
        // CHESTS
        { itemId: 1302, dropChance: 5 },
        { itemId: 1304, dropChance: 6 },
        { itemId: 1305, dropChance: 7 },
        { itemId: 1306, dropChance: 3 },
        // LEGS
        { itemId: 1502, dropChance: 7 },
        { itemId: 1504, dropChance: 3 },
        { itemId: 1505, dropChance: 8 },
        { itemId: 1506, dropChance: 2 },
        // HEAD
        { itemId: 1102, dropChance: 4 },
        { itemId: 1104, dropChance: 5 },
        { itemId: 1105, dropChance: 8 },
        { itemId: 1106, dropChance: 5 },
      ];
  }
}

export const generateXP = (realm: TCurrentRealm, questIndex: number, level: number) => {
  const baseXp = getMaxBaseXp(realm);
  const experience = baseXp * questIndex;
  const levelExperienceBonus = getLevelXpBonus(realm, level);
  return Math.round(experience + levelExperienceBonus);
};

export const generateGold = (realm: TCurrentRealm, questIndex: number) => {
  const baseGold = getRealmGoldReward(realm);
  const gold = baseGold * questIndex;
  return Math.round(gold * 20) / 20;
};

export const generateReputation = (realm :TCurrentRealm) => {
  switch (realm) {
    case "CAVERNS":
      return 2;
    case "CRYPT":
      return 5;
  }
}

const generateQuest = async (
  realm: TCurrentRealm,
  quest: { title: string; description: string; isBoss: boolean, itemReward?: {itemId: number, dropChance: number}[] },
  questIndex: number,
  timeStamps: number[],
  level: number
) => {
  const timeStampIndex = Math.round(Math.random() * (timeStamps.length - 1));
  const randomTimeStamp = timeStamps[timeStampIndex];
  const xp = generateXP(realm, questIndex, level);
  const gold = generateGold(realm, questIndex);
  const itemPool = quest?.itemReward || getRealmItemPool(realm);
  return {
    title: quest.title,
    description: quest.description,
    duration: randomTimeStamp,
    rewards: {
      xp: xp,
      gold: gold,
      item: await generateItemReward(itemPool),
      reputation: generateReputation(realm),
    },
    battleStarted: false,
    isBoss: quest.isBoss,
  };
};

const generateQuests = async (realm: TCurrentRealm, level: number) => {
  // generate quest for availableQuests realm
  const randomQuests = getRandomQuests(realm, level);
  const firstQuest = await generateQuest(
    realm,
    randomQuests[0],
    0.5,
    [200, 260, 320],
    level
  );
  const secondQuest = await generateQuest(realm, randomQuests[1], 1, [300, 360, 420], level);
  const thirdQuest = await generateQuest(realm, randomQuests[2], 2.5, [840, 900, 960], level);
  return [firstQuest, secondQuest, thirdQuest];
};

export default generateQuests;
