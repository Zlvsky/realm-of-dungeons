import { TCurrentRealm } from "../../../types/account/MainInterfaces";
import { getRandomEnemy } from "./getRandomEnemy";

const generateEnemy = (currentRealm: TCurrentRealm, playerLevel: number, isBoss?: boolean ) => {
    const enemy = getRandomEnemy(currentRealm, isBoss);
    let levelDifference = 1;
    if (enemy.maxLevel && playerLevel > enemy.maxLevel) {
        levelDifference = enemy.maxLevel - enemy.level;
        enemy.level = enemy.maxLevel;
    } else if (playerLevel > enemy.level) {
        levelDifference = playerLevel - enemy.level;
        enemy.level = playerLevel;
    }
    if (levelDifference > 1) {
        enemy.damage = Math.round(enemy.damage + ((enemy.damage * 0.1) * levelDifference));
        enemy.health = Math.round(enemy.health + ((enemy.health * 0.1) * levelDifference));
        enemy.maxHealth = Math.round(enemy.maxHealth + ((enemy.maxHealth * 0.1) * levelDifference));
    }
    return enemy;
}

export default generateEnemy;