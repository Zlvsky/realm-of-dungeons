import { Request, Response } from "express";
import { Character } from "../../../schemas/character/characterSchema";
import getUserIdFromToken from "../../../utils/getUserIdFromToken";

export const getCharacterPreview = async (req: Request, res: Response) => {
  const { characterId } = req.params;

  try {
    const userId = getUserIdFromToken(req.headers.authorization);
    if (!userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    if (!characterId) 
        return res.status(400).json({ message: "Character not found" });

    const character = await Character.findById(characterId)
        .select("_id nickname avatar progression updatedValues equipment class")
        .exec();

    if (!character) {
      return res.status(400).json({ message: "Character not found" });
    }

    res.status(200).json(character);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
