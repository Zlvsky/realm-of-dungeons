import express, { Request, Response } from "express";
import mongoose from "mongoose";
import getCharacterAvatar from "../../gameUtils/characters/getAvatar";
import getBaseStatistics from "../../gameUtils/characters/getBaseStatistics";
import { Character } from "../../schemas/character/characterSchema";
import getUserIdFromToken from "../../utils/getUserIdFromToken";
import initEquipment from "../../gameUtils/initValues/initEquipment";
import initInventory from "../../gameUtils/initValues/initInventory";
import generateQuests from "../../gameUtils/quests/generateQuests";
import getNextLevelExperience from "../../gameUtils/characters/getNextLevelExperience";
import getNextStatisticLevelExperience from "../../gameUtils/characters/getNextStatisticLevelExperience";

const router = express.Router();

// POST /api/characters
export const createCharacter = async (req: Request, res: Response) => {
  try {
    // Create new character object
    const character = new Character({
      nickname: req.body.nickname,
      class: req.body.class,
      progression: {
        level: 1,
        levelExperience: getNextLevelExperience[1],
        previousLevelExperience: getNextLevelExperience[0],
        statistics: {
          melee: { levelExperience: getNextStatisticLevelExperience[1] },
          distance: { levelExperience: getNextStatisticLevelExperience[1] },
          magic: { levelExperience: getNextStatisticLevelExperience[1] },
          resistance: { levelExperience: getNextStatisticLevelExperience[1] },
        },
      },
      statistics: getBaseStatistics(req.body.class),
      equipment: initEquipment,
      inventory: initInventory(req.body.class),
      availableQuests: [
        {
          realm: "CAVERNS",
          finishedQuests: 0,
          quests: await generateQuests("CAVERNS", 1),
        },
      ],
      avatar: getCharacterAvatar(req.body.class),
      owner: getUserIdFromToken(req.headers.authorization), // Set the owner of the character to the authenticated user (implementation of this step is outside the scope of this answer)
      updatedValues: {
        statistics: getBaseStatistics(req.body.class),
      },
      generalValues: {},
      activeQuest: {},
      merchantsItems: {},
      realms: {},
    });

    // Save character to the database
    await character.save();

    res.status(200).json(character);
  } catch (err) {
    console.log(err);
    res.status(403).send("Unauthorized");
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

  if (userId === null) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  const userIdObject = mongoose.Types.ObjectId.createFromHexString(userId)
  if (character.owner === userIdObject) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  res.status(200).json(character);
};

export const getUserCharacters = async (req: Request, res: Response) => {
  try {
    const userId: any = getUserIdFromToken(req.headers.authorization);
    const characters = await Character.find({ owner: userId });

    if (characters.length === 0) {
      res.status(200).send([]);
    }  else {
      res.json(characters);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
};

export default router;
