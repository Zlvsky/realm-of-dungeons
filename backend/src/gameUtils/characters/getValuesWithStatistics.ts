import { ICharacter } from "../../types/account/MainInterfaces"

const getValuesWithStatistics = (character: ICharacter) => {
    if (character.class === "warrior") character.updatedValues.damage = Math.round(character.updatedValues.damage * 0.33 * (1 + character.updatedValues.statistics.strength / 10));
    if (character.class === "archer") character.updatedValues.damage = Math.round(character.updatedValues.damage * 0.33 * (1 + character.updatedValues.statistics.dexterity / 10));
    if (character.class === "mage") character.updatedValues.damage = Math.round(character.updatedValues.damage * 0.33 * (1 + character.updatedValues.statistics.intelligence / 10));
    character.updatedValues.health = Math.round(character.updatedValues.health + (character.updatedValues.statistics.condition * 2 * character.progression.level));   
    character.updatedValues.maxHealth = Math.round(character.updatedValues.maxHealth + (character.updatedValues.statistics.condition * 2 * character.progression.level));   
}

export default getValuesWithStatistics;