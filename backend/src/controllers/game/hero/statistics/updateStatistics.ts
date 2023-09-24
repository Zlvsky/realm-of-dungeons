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

    switch (statistic) {
      case "melee":
        character.statistics.melee += 1;
        break;
      case "distance":
        character.statistics.distance += 1;
        break;
      case "magic":
        character.statistics.magic += 1;
        break;
      case "luck":
        character.statistics.luck += 1;
        break;
      case "resistance":
        character.statistics.resistance += 1;
        break;
      default:
        return res.status(404).json({ message: "Wrong statistic" });
    }


    await updateCharacterValues(character);
    getValuesWithStatistics(character);

    await character.save();
    return res.json("success");
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};
