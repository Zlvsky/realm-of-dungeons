import { ICharacter } from "../../types/account/MainInterfaces"

const getValuesWithStatistics = (character: ICharacter) => {
    // DAMAGE
    const weaponItem = character.equipment.filter(item => item.type === "weapon")[0].item;
    let weaponDamage = 0;
    if (weaponItem) weaponDamage = Math.round((weaponItem.minDamage! + weaponItem.maxDamage!) / 2);

    let classMainStatistic = 10;
    if (character.class === "warrior") classMainStatistic = character.updatedValues.statistics.strength;
    if (character.class === "archer") classMainStatistic = character.updatedValues.statistics.dexterity;
    if (character.class === "mage") classMainStatistic = character.updatedValues.statistics.intelligence;
    
    const baseDamage = character.generalValues.basicDamage;
    const totalDamage = baseDamage + weaponDamage;
    const damageModifier = classMainStatistic / 10;
    
    character.updatedValues.damage = Math.round(totalDamage * damageModifier);
    
    // HEALTH
    const baseHealth = character.generalValues.basicHealth;
    const lostHealth = character.updatedValues.maxHealth - character.updatedValues.health;
    const conditionBonusHealth = (character.updatedValues.statistics.condition * 2 * character.progression.level);
    
    character.updatedValues.maxHealth = Math.round(baseHealth + conditionBonusHealth);
    character.updatedValues.health = Math.round(baseHealth + conditionBonusHealth - lostHealth);

}

export default getValuesWithStatistics;