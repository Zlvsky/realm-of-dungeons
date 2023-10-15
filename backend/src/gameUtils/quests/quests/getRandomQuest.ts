import { TCurrentRealm } from "../../../types/account/MainInterfaces";
import { cavernsQuests } from "./data/caverns/cavernsQuests";

const getRealmQuests = (realm: TCurrentRealm) => {
  switch (realm) {
    case "CAVERNS":
      return cavernsQuests;
    case "CRYPT":
      return cavernsQuests;
  }
};

const isBossAvailable = (bossRequiredLevel: number, level: number) => {
  if (bossRequiredLevel > level) return false;
  const bossChance = 20;
  const randomNum = Math.random() * 100;
  return randomNum <= bossChance;
}

export const getRandomQuests = (currentRealm: TCurrentRealm, level: number) => {
  const regularQuestsIndexArray: Set<number> = new Set();
  let bossessIndex;
  const realmQuests = getRealmQuests(currentRealm)!;
  const regularQuests = realmQuests.regular;
  const bossessQuests = realmQuests.bossess.quests;
  const bossRequiredLevel = realmQuests.bossess.requiredLevel;

  const isBoss = isBossAvailable(bossRequiredLevel, level);

  const questsToReturn = [];

  const regularQuestSize = isBoss ? 2 : 3;

  if (isBoss) {
    const index = Math.floor(Math.random() * bossessQuests.length);
    bossessIndex = index;
  }

  while (regularQuestsIndexArray.size < regularQuestSize) {
    const index = Math.floor(Math.random() * regularQuests.length);
    regularQuestsIndexArray.add(index);
  }

  regularQuestsIndexArray.forEach((index) => {
    const regularQuest = regularQuests[index];
    questsToReturn.push({
      ...regularQuest,
      isBoss: false,
    });
  });

  if (isBoss && bossessIndex) {
    const bossQuest = bossessQuests[bossessIndex];
    questsToReturn.push({
      ...bossQuest,
      isBoss: true,
    })
  };

  return questsToReturn;
};
