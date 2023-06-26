import { getRandomEnemy } from "./questEnemies";

const generateEnemy = (playerLevel: number) => {
    const enemy = getRandomEnemy();
    enemy.level = playerLevel;
    enemy.damage = enemy.damage + (5 * playerLevel);
    enemy.health = enemy.health + (15 * playerLevel);
    enemy.maxHealth = enemy.maxHealth + (15 * playerLevel);
    enemy.statistics.charisma = enemy.statistics.charisma + (1 * playerLevel);
    enemy.statistics.condition = enemy.statistics.condition + 1 * playerLevel;
    enemy.statistics.dexterity = enemy.statistics.dexterity + 1 * playerLevel;
    enemy.statistics.intelligence = enemy.statistics.intelligence + (1 * playerLevel);
    enemy.statistics.strength = enemy.statistics.strength + 1 * playerLevel;
    enemy.statistics.wisdom = enemy.statistics.wisdom + 1 * playerLevel;
    return enemy;
}

export default generateEnemy;