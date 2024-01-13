import { getRandomEnemy } from "../gameUtils/quests/enemies/getRandomEnemy";
import { TCurrentRealm } from "../types/account/MainInterfaces";

const LEVEL = 1;
const REALM = "CAVERNS";

const generateEnemy = (
  currentRealm: TCurrentRealm,
  playerLevel: number,
  isBoss?: boolean
) => {
  const enemyObject = getRandomEnemy(currentRealm, isBoss);
  const enemy = JSON.parse(JSON.stringify(enemyObject));

  let levelDifference = 1;
  if (enemy.maxLevel && playerLevel > enemy.maxLevel) {
    levelDifference = enemy.maxLevel - enemy.level;
    enemy.level = enemy.maxLevel;
  } else if (playerLevel > enemy.level) {
    levelDifference = playerLevel - enemy.level;
    enemy.level = playerLevel;
  }
  if (levelDifference > 1) {
    enemy.damage = Math.round(
      enemy.damage + enemy.damage * 0.1 * levelDifference
    );
    enemy.health = Math.round(
      enemy.health + enemy.health * 0.1 * levelDifference
    );
    enemy.maxHealth = Math.round(
      enemy.maxHealth + enemy.maxHealth * 0.1 * levelDifference
    );
  }
  return enemy;
};


const tesstGeneratingMob = () => {
    describe(`Exp Gain test`, () => {
      it("Testing exp gains", async () => {
        for (let i = 0; i < 20; i++) {
            const mob = generateEnemy(REALM, 10);
            console.log("---- level 10", mob);
            const mob2 = generateEnemy(REALM, 1);
            console.log("---- level 1", mob2);
        }
        return true;
      });
    });
}

tesstGeneratingMob();
