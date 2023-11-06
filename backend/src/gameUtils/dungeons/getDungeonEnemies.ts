import { TCurrentRealm } from "../../types/account/MainInterfaces";
import { cavernsDungeonEnemies } from "./caverns/cavernsDungeonEnemies";
import { cryptDungeonEnemies } from "./crypt/cryptDungeonEnemies";

export const getDungeonEnemies = (realm: TCurrentRealm) => {
  switch (realm) {
    case "CAVERNS":
      return cavernsDungeonEnemies;
    case "CRYPT":
      return cryptDungeonEnemies;
  }
};
