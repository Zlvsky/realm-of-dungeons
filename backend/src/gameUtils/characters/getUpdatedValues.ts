import { ICharacter } from "../../types/account/MainInterfaces";

// Helper function to calculate values from equipment
const calculateEquipmentValues = (equipment: ICharacter["equipment"]) => {
  return equipment.reduce(
    (accumulator, currentItem) => {
      const item = currentItem.item;

      if (item === null) return accumulator;

      if (item.defense) {
        accumulator.defense += item.defense;
      }

      if (item.damage) {
        accumulator.damage += item.damage;
      }

      if (item.statistics) {
        const statisticsKeys: any[] = Object.keys(item.statistics);
        statisticsKeys.forEach((stat: keyof typeof item.statistics) => {
          if (item.statistics && item.statistics[stat]) {
            if (stat === "defense" || stat === "health" || stat === "mana") {
              accumulator[stat] = accumulator[stat] + item.statistics[stat]!;
            } else {
              accumulator.statistics[stat] =
                accumulator.statistics[stat] + item.statistics[stat]!;
            }
          }
        });
      }

      return accumulator;
    },
    {
      defense: 0,
      damage: 0,
      health: 0,
      mana: 0,
      statistics: {
        axe: 0,
        sword: 0,
        mace: 0,
        distance: 0,
        magic: 0,
      },
    }
  );
};

// Main function to update character values
const updateCharacterValues = async (character: ICharacter) => {
  try {
    if (!character) return false;
    const equipmentValues = calculateEquipmentValues(character.equipment);
    console.log("stats", equipmentValues);

    character.updatedValues.defense =
      character.generalValues.basicDefense + equipmentValues.defense;
    character.updatedValues.damage = equipmentValues.damage;

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
