import express, { Request, Response } from "express";
import mongoose from "mongoose";
import getCharacterAvatar from "../../gameUtils/characters/getAvatar";
import getBaseStatistics from "../../gameUtils/characters/getBaseStatistics";
import { Character } from "../../schemas/account/characterSchema";
import getUserIdFromToken from "../../utils/getUserIdFromToken";
import initEquipment from "../../gameUtils/initValues/initEquipment";
import initInventory from "../../gameUtils/initValues/initInventory";
import { ICharacter } from "../../types/account/MainInterfaces";
import generateQuests from "../../gameUtils/quests/generateQuests";
import getNextLevelExperience from "../../gameUtils/characters/getNextLevelExperience";

const router = express.Router();

const getCharacterWithItemValues = (characterMain: ICharacter) => {
  const character: ICharacter = JSON.parse(JSON.stringify(characterMain));
  let armor = character.heroValues.armor;
  let damage = character.heroValues.damage;
  const statistics: any = character.statistics;
  character.equipment.forEach((itemElement) => {
    const item = itemElement.item;
    if(!item) return;
    const itemStats: any = item.statistics;
    const stats = Object.keys(itemStats);
    if (item.armor) armor += item.armor;
    if (item.minDamage && item.maxDamage) damage += Math.round((item.minDamage + item.maxDamage) / 2);
    stats.forEach((stat) => {
      statistics[`${stat}`] += itemStats[`${stat}`];
    })
  });
  const updatedValues =  {
      armor,
      damage,
      statistics
  };
  return updatedValues
}

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
      },
      statistics: getBaseStatistics(req.body.class),
      equipment: initEquipment,
      inventory: initInventory,
      availableQuests: generateQuests(1),
      avatar: getCharacterAvatar(req.body.class),
      owner: getUserIdFromToken(req.headers.authorization), // Set the owner of the character to the authenticated user (implementation of this step is outside the scope of this answer)
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
  const character = await Character.findById(characterId)
    .populate({
      path: "equipment.item",
      model: "Item",
    })
    .populate({
      path: "inventory.item",
      model: "Item",
    })
    .exec();

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

  const hero: ICharacter = JSON.parse(JSON.stringify(character));
  const characterWithItemValues = getCharacterWithItemValues(hero);
  hero.heroValuesWithItems = characterWithItemValues;
  
  res.status(200).json(hero);
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
