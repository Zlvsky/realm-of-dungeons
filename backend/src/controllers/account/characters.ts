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
import generateMerchantItems from "../../gameUtils/merchants/generateMerchantItems";
import { cavernsDungeonEnemies } from "../../gameUtils/dungeons/caverns/cavernsDungeonEnemies";
import { checkAuth } from "../../utils/checkAuth";
import { getAllMerchants } from "../../scheduled-tasks/scheduledCharacterTasks";
import getItemsForMerchant from "../../gameUtils/merchants/getItemsForMerchant";
import getStaticItemsForMerchant from "../../gameUtils/merchants/getStaticItems";

const router = express.Router();

const statisticProgression = (baseStatistics: any, stat: string) => {
  const statLevel: number = baseStatistics[stat];

  return {
    levelExperience: getNextStatisticLevelExperience[statLevel],
    previousLevelExperience: getNextStatisticLevelExperience[statLevel - 1],
    experience: getNextStatisticLevelExperience[statLevel - 1],
  };
}

// POST /api/characters
export const createCharacter = async (req: Request, res: Response) => {
  const jwt = req.headers.authorization;

  if (!jwt) return res.status(403).json({ message: "Unauthorized" });

  const userId = getUserIdFromToken(jwt);

  if (!userId) return res.status(403).json({ message: "Unauthorized" });

  const character = await Character.findOne({ nickname: req.body.nickname });

  if (character)
    return res.status(400).json({ message: "Character name already taken" });

  try {
    // Create new character object
    const baseStatistics = getBaseStatistics(req.body.class);

    const merchants = await getAllMerchants();

    const alchemist = merchants?.find(merchant => merchant.name === "Alchemist");
    const weaponsmith = merchants?.find(merchant => merchant.name === "Weaponsmith");
    const armourer = merchants?.find(merchant => merchant.name === "Armourer");
    const witch = merchants?.find(merchant => merchant.name === "Witch");

    const character = new Character({
      nickname: req.body.nickname,
      class: req.body.class,
      progression: {
        level: 1,
        levelExperience: getNextLevelExperience[1],
        previousLevelExperience: getNextLevelExperience[0],
        reputation: 0,
        statistics: {
          melee: statisticProgression(baseStatistics, "melee"),
          distance: statisticProgression(baseStatistics, "distance"),
          magic: statisticProgression(baseStatistics, "magic"),
          resistance: statisticProgression(baseStatistics, "resistance"),
        },
      },
      statistics: baseStatistics,
      equipment: initEquipment,
      inventory: initInventory(req.body.class),
      availableQuests: [
        {
          realm: "CAVERNS",
          finishedQuests: 0,
          quests: await generateQuests("CAVERNS", 1, 120),
        },
      ],
      dungeons: [
        {
          realm: "CAVERNS",
          currentMonster: 0,
          dungeonRenewDate: null,
          enemies: cavernsDungeonEnemies,
        },
      ],
      avatar: getCharacterAvatar(req.body.class),
      owner: userId, // Set the owner of the character to the authenticated user (implementation of this step is outside the scope of this answer)
      updatedValues: {
        statistics: getBaseStatistics(req.body.class),
      },
      generalValues: {},
      activeQuest: {},
      merchantsItems: {
        alchemist: await getStaticItemsForMerchant(alchemist!, 1),
        weaponsmith: await getItemsForMerchant(weaponsmith!, 1),
        armourer: await getItemsForMerchant(armourer!, 1),
        witch: await getItemsForMerchant(witch!, 1),
      },
      realms: {},
    });

    // await generateMerchantItems(character);

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
  const jwt = req.headers.authorization;

  // Get character by ID
  const character = await Character.findById(characterId);

  if (!character) {
    return res.status(404).json({ message: "Character not found" });
  }

  const isAuthenticated = checkAuth(character.owner, jwt);
  if (!isAuthenticated) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  res.status(200).json(character);
};

export const getUserCharacters = async (req: Request, res: Response) => {
  try {
    const userId = getUserIdFromToken(req.headers.authorization);
    if (!userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

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
