import { Request, Response } from "express";
import { Character } from "../../../schemas/character/characterSchema";
import { getStatisticData } from "./helpers/getStatisticData";
import levelUpStatisticIfReady from "../../../gameUtils/characters/levelUpStatisticIfReady";
import { checkAuth } from "../../../utils/checkAuth";

export const trainStatistic = async (req: Request, res: Response) => {
  const { characterId, stat } = req.body;
  try {
    const character = await Character.findById(characterId);

    if (!character)
      return res.status(404).json({ message: "Character not found" });

    const isAuthenticated = checkAuth(character.owner, req.headers.authorization);
    if (!isAuthenticated) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    if (!stat) 
        return res.status(400).json({ message: "Stat not provided" });

    const statisticData = getStatisticData(stat, character);

    if (!statisticData)
      return res.status(400).json({ message: "Invalid statistic" });

    if (character.generalValues.gold < statisticData.trainingFee)
      return res.status(400).json({ message: "Not enough gold" });

    const currentStatFullExperience = statisticData.statProgression.levelExperience - statisticData.statProgression.previousLevelExperience;

    let trainingPoints = 0;

    if (
      (stat === "MELEE" && character.class === "warrior") ||
      (stat === "DISTANCE" && character.class === "archer") ||
      (stat === "MAGIC" && character.class === "mage")
    ) {
      trainingPoints = Math.round(currentStatFullExperience * 0.1);
      if (trainingPoints < 2) trainingPoints = 2;
    } else {
      trainingPoints = Math.round(currentStatFullExperience * 0.05);
      if (trainingPoints < 1) trainingPoints = 1;
    }

    statisticData.statProgression.experience += trainingPoints;
    levelUpStatisticIfReady(character, stat.toLowerCase());
    character.generalValues.gold -= statisticData.trainingFee;

    await character.save();
    return res.json("success");
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};
