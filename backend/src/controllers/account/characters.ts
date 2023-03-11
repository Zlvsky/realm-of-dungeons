import express, { Request, Response } from "express";
import { Character } from "../../schemas/account/characterSchema";
import getUserIdFromToken from "../../utils/getUserIdFromToken";

const router = express.Router();

// POST /api/characters
export const createCharacter = async (req: Request, res: Response) => {
  try {
    // Create new character object
    const character = new Character({
      nickname: req.body.nickname,
      level: 1,
      class: req.body.class,
      levelExperience: 0,
      statistics: req.body.statistics,
      owner: getUserIdFromToken(req.headers.authorization), // Set the owner of the character to the authenticated user (implementation of this step is outside the scope of this answer)
    });

    // Save character to the database
    await character.save();

    res.status(200).send(res.json(character));
  } catch (err) {
    console.log(err);
    res.status(500).send("");
  }
  // Extract character data from request body
};

export const getCharacterById = async (req: Request, res: Response) => {
  const characterId = req.params.id;

  // Get character by ID
  const character = await Character.findById(characterId);

  if (!character) {
    return res.status(404).json({ message: "Character not found" });
  }

  // Check if authenticated user owns the character (implementation of this step is outside the scope of this answer)
  const userId: any = getUserIdFromToken(req.headers.authorization);
  if (character.owner !== userId) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  res.json(character);
};

export default router;
