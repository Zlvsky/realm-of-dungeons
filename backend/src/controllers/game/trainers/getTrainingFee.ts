import { Request, Response } from "express";
import { Character } from "../../../schemas/character/characterSchema";
import { getStatisticData } from "./helpers/getStatisticData";
import { checkAuth } from "../../../utils/checkAuth";

export const getTrainingFee = async (req: Request, res: Response) => {
  const { characterId, stat } = req.body;
  try {
    const character = await Character.findById(characterId);

    if (!character)
      return res.status(404).json({ message: "Character not found" });

    const isAuthenticated = checkAuth(character.owner, req.headers.authorization);
    if (!isAuthenticated) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    if (!stat) return res.status(400).json({ message: "Stat not provided" });

    const statisticData = getStatisticData(stat, character);

    if (!statisticData)
      return res.status(400).json({ message: "Invalid statistic" });

    return res.status(200).json({ fee: statisticData.trainingFee });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};
