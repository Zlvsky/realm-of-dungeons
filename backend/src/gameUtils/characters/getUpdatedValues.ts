import { Character } from "../../schemas/character/characterSchema";
import { ICharacter } from "../../types/account/MainInterfaces";

// Helper function to calculate values from equipment
const calculateEquipmentValues = (equipment: ICharacter["equipment"]) => {
  return equipment.reduce(
    (accumulator, currentItem) => {
      const item = currentItem.item;

      if (item === null) return accumulator;

      if (item.armor) {
        accumulator.armor += item.armor;
      }

      if (item.minDamage && item.maxDamage) {
        accumulator.damage += Math.round((item.minDamage + item.maxDamage) / 2);
      }

      for (const stat in item.statistics) {
        // hack used for typescript..
        let statCopy: any = stat;
        let correctStat: keyof typeof item.statistics = statCopy;
        if (item.statistics.hasOwnProperty(stat)) {
          // Type assertion here to tell TypeScript that stat is a valid key
          accumulator.statistics[correctStat] =
            (accumulator.statistics[correctStat] || 0) +
            (item.statistics[correctStat] as number);
        }
      }

      return accumulator;
    },
    {
      armor: 0,
      damage: 0,
      statistics: {
        strength: 0,
        dexterity: 0,
        condition: 0,
        intelligence: 0,
        wisdom: 0,
        charisma: 0,
      },
    }
  );
};

// Main function to update character values
const updateCharacterValues = async (character: ICharacter) => {
  try {
    if (!character) return false;
    const equipmentValues = calculateEquipmentValues(character.equipment);

    character.updatedValues.armor =
      character.generalValues.basicArmor + equipmentValues.armor;
    character.updatedValues.damage =
      character.generalValues.basicDamage + equipmentValues.damage;

    for (const stat in equipmentValues.statistics) {
      let statCopy: any = stat;
      let correctStat: keyof typeof equipmentValues.statistics = statCopy;
      if (!equipmentValues.statistics[correctStat]) {
        character.updatedValues.statistics[correctStat] =
          character.statistics[correctStat];
      } else {
        character.updatedValues.statistics[correctStat] =
          character.statistics[correctStat] +
          equipmentValues.statistics[correctStat];
      }
    }

  } catch (err) {
    console.error(err);
    return;
  }
};

export default updateCharacterValues;
