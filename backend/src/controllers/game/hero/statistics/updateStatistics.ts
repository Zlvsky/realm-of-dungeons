import { Request, Response } from "express";
import { Character } from "../../../../schemas/character/characterSchema";
import getValuesWithStatistics from "../../../../gameUtils/characters/getValuesWithStatistics";
import updateCharacterValues from "../../../../gameUtils/characters/getUpdatedValues";

export const updateStatistics = async (req: Request, res: Response) => {
  const { characterId, statistic } = req.body;
  try {
    const character = await Character.findById(characterId);
      
    if (!character)
      return res.status(404).json({ message: "Character not found" });

    if (
      character.progression.availableStatPoints === 0 ||
      !character.progression.availableStatPoints
    )
      return res
        .status(404)
        .json({ message: "You don't have statistics points available" });

    switch (statistic) {
      case "axe":
        character.statistics.axe += 1;
        break;
      case "sword":
        character.statistics.sword += 1;
        break;
      case "mace":
        character.statistics.mace += 1;
        break;
      case "distance":
        character.statistics.distance += 1;
        break;
      case "magic":
        character.statistics.magic += 1;
        break;
      default:
        return res.status(404).json({ message: "Wrong statistic" });
    }

    character.progression.availableStatPoints -= 1;

    await updateCharacterValues(character);
    getValuesWithStatistics(character);

    await character.save();
    return res.json("success");
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};
