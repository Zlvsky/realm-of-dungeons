import { Request, Response } from "express";
import { Character } from "../../../../schemas/character/characterSchema";

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
      case "strength":
        character.statistics.strength += 1;
        break;
      case "dexterity":
        character.statistics.dexterity += 1;
        break;
      case "intelligence":
        character.statistics.intelligence += 1;
        break;
      case "condition":
        character.statistics.condition += 1;
        break;
      case "wisdom":
        character.statistics.wisdom += 1;
        break;
      case "charisma":
        character.statistics.charisma += 1;
        break;
      default:
        return res.status(404).json({ message: "Wrong statistic" });
    }

    character.progression.availableStatPoints -= 1;

    await character.save();
    return res.json("success");
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};
