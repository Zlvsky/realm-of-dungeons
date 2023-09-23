import { ICharacter } from "../../types/account/MainInterfaces"

const getValuesWithStatistics = (character: ICharacter) => {
    // DAMAGE
    const weaponItem = character.equipment.find(item => item.type === "weapon")?.item;
    let weaponDamage = 0;
    if (weaponItem) weaponDamage = weaponItem.damage!;

    let combatStatistic = 10;
    if (weaponItem?.subType === "axe") combatStatistic = character.updatedValues.statistics.axe;
    if (weaponItem?.subType === "sword") combatStatistic = character.updatedValues.statistics.sword;
    if (weaponItem?.subType === "mace") combatStatistic = character.updatedValues.statistics.mace;
    if (weaponItem?.subType === "bow" || weaponItem?.subType === "crossbow") combatStatistic = character.updatedValues.statistics.distance;
    if (weaponItem?.subType === "wand") combatStatistic = character.updatedValues.statistics.magic;
    
    let classCombatIndicator = 0.085;
    if (character.class === "warrior") classCombatIndicator = 0.085;
    if (character.class === "archer") classCombatIndicator = 0.1;
    if (character.class === "mage") classCombatIndicator = 0.125;

    const minDmg = character.progression.level / 5;
    const maxDmg = classCombatIndicator * combatStatistic * weaponDamage + minDmg;

    const avgDmg = (minDmg + maxDmg) / 2;
    const damageOutput = Math.floor(Math.random() * maxDmg) + avgDmg;
    
    character.updatedValues.damage = damageOutput;
    
    // HEALTH
    const baseHealth = character.generalValues.basicHealth;
    const lostHealth = character.updatedValues.maxHealth - character.updatedValues.health;
    // const conditionBonusHealth = (character.updatedValues.statistics.condition * 2 * character.progression.level);
    
    character.updatedValues.maxHealth = Math.round(baseHealth);
    character.updatedValues.health = Math.round(baseHealth - lostHealth);

}

export default getValuesWithStatistics;