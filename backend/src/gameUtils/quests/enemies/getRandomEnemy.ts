import { TCurrentRealm } from "../../../types/account/MainInterfaces";
import { cavernsEnemies } from "./data/caverns/cavernsEnemies";

const getRealmEnemies = (realm: TCurrentRealm) => {
  switch (realm) {
    case "CAVERNS":
      return cavernsEnemies;
  }
};

export const getRandomEnemy = (currentRealm: TCurrentRealm, isBoss?: boolean) => {
  const realmEnemies = getRealmEnemies(currentRealm)!;
  const regularEnemies = realmEnemies.regular;
  const bossess = realmEnemies.bossess;
  if (isBoss) {
    const randomIndex = Math.floor(Math.random() * bossess.length);
    return bossess[randomIndex];
  }
  const randomIndex = Math.floor(Math.random() * regularEnemies.length);
  return regularEnemies[randomIndex];
};