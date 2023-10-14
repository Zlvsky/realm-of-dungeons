import { TCurrentRealm } from "../../../types/account/MainInterfaces";
import { cavernsQuests } from "./data/caverns/cavernsQuests";

const getRealmQuests = (realm: TCurrentRealm) => {
  switch (realm) {
    case "CAVERNS":
      return cavernsQuests;
  }
};

export const getRandomQuests = (currentRealm: TCurrentRealm, isBoss?: boolean) => {
  const regularQuestsIndexArray: Set<number> = new Set();
  let bossessIndex;
  const realmQuests = getRealmQuests(currentRealm)!;
  const regularQuests = realmQuests.regular;
  const bossessQuests = realmQuests.bossess;

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

  if (isBoss && bossessIndex) {
    const bossQuest = bossessQuests[bossessIndex];
    questsToReturn.push({
      ...bossQuest,
      isBoss: true,
    })
  };

  regularQuestsIndexArray.forEach((index) => {
    const regularQuest = regularQuests[index];
    questsToReturn.push({
      ...regularQuest,
      isBoss: false,
    });
  })

  return questsToReturn;
};
