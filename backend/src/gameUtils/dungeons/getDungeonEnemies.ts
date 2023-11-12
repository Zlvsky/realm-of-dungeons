import { ICharacter, IDungeon } from "../../types/account/MainInterfaces";
import { generateItemReward } from "../items/generateItemReward";
import { cavernsDungeonEnemies } from "./caverns/cavernsDungeonEnemies";
import { cryptDungeonEnemies } from "./crypt/cryptDungeonEnemies";

const getRealmDungeonEnemies = (realm: string) => {
  switch (realm) {
    case "CAVERNS":
      return cavernsDungeonEnemies;
    case "CRYPT":
      return cryptDungeonEnemies;
  }
}

export const getDungeonEnemies = async (character: ICharacter, realmDungeon: IDungeon) => {
  const currentRealm = character.realms.currentRealm;
  const realmDungeonEnemies = getRealmDungeonEnemies(currentRealm);
  
  const currentDungeonEnemy = realmDungeonEnemies![realmDungeon.currentMonster];

  const itemPool = currentDungeonEnemy?.rewards.itemReward;

  const enemyToReturn: any = currentDungeonEnemy;

  
  enemyToReturn.rewards.item = await generateItemReward(itemPool);

  return enemyToReturn;
};
