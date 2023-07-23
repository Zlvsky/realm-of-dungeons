import { ICharacter } from "../../types/account/MainInterfaces"

const getValuesWithStatistics = (character: ICharacter) => {
    console.log(character);
    if (character.class === "warrior") character.heroValuesWithItems.damage = Math.round(character.heroValuesWithItems.damage * 0.33 * (1 + character.heroValuesWithItems.statistics.strength / 10));
    if (character.class === "archer") character.heroValuesWithItems.damage = Math.round(character.heroValuesWithItems.damage * 0.33 * (1 + character.heroValuesWithItems.statistics.dexterity / 10));
    if (character.class === "mage") character.heroValuesWithItems.damage = Math.round(character.heroValuesWithItems.damage * 0.33 * (1 + character.heroValuesWithItems.statistics.intelligence / 10));
    character.heroValues.currentHealth = Math.round(character.heroValues.currentHealth + (character.heroValuesWithItems.statistics.condition * 2 * character.progression.level));   
    character.heroValues.health = Math.round(character.heroValues.health + (character.heroValuesWithItems.statistics.condition * 2 * character.progression.level));   
}

export default getValuesWithStatistics;