import { Request, Response } from "express";

import { ICharacter } from "../../../types/account/MainInterfaces";
import { Character } from "../../../schemas/character/characterSchema";
import generateEnemy from "../../../gameUtils/quests/enemies/generateEnemy";
import { getRealmDungeon } from "../../../gameUtils/dungeons/getRealmDungeon";
import { checkAuth } from "../../../utils/checkAuth";

export const updateActiveQuest = async (req: Request, res: Response) => {
  const { characterId, questId } = req.body;
  try {
    const character: ICharacter | null = await Character.findById(characterId);
    if (!character) {
      return res.status(404).json({ message: "Character not found" });
    }

    const isAuthenticated = checkAuth(character.owner, req.headers.authorization);
    if (!isAuthenticated) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const currentRealm = character.realms.currentRealm;

    const availableQuestsIndex = character.availableQuests.findIndex(
      (el) => el.realm === currentRealm
    );

    const realmAvailableQuests =
      character.availableQuests[availableQuestsIndex].quests;

    const selectedQuest: any = realmAvailableQuests.find(
      (quest) => quest._id!.toString() === questId
    );
    
    if (!selectedQuest) {
      return res.status(404).json({ message: "Quest not found" });
    }

    const realmDungeon = getRealmDungeon(character);

    if (realmDungeon.battle.isBattleStarted)
      return res.status(400).json({ message: "Finish dungeon first" });

    const maxHealth = character.updatedValues.maxHealth;
    const currentHealth = character.updatedValues.health;

    if ((currentHealth / maxHealth) < 0.1)
      return res.status(400).json({ message: "You are too wounded" });

    character.activeQuest.quest = selectedQuest;
    character.activeQuest.timeStarted = new Date().toISOString();
    character.activeQuest.textLogs = [];
    await character.save();
    res.json(character);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

export const clearActiveQuest = async (req: Request, res: Response) => {
  const { characterId } = req.body;
  try {
    const character: ICharacter | null = await Character.findById(characterId);
    if (!character) {
      return res.status(404).json({ message: "Character not found" });
    }
    character.activeQuest.quest = null;
    character.activeQuest.timeStarted = null;
    await character.save();
    res.json(character);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

export const startQuestBattle = async (req: Request, res: Response) => {
  const { characterId } = req.body;
  try {
    const character: ICharacter | null = await Character.findById(characterId);
    if (!character) {
      return res.status(404).json({ message: "Character not found" });
    }

    if (character.activeQuest.quest && character.activeQuest.timeStarted) {
      const now = new Date();
      const questTime = new Date(character.activeQuest.timeStarted);
      const randomEnemy = generateEnemy(character.realms.currentRealm, character.progression.level, character.activeQuest?.isBoss);
      
      if(now > questTime) {
        character.activeQuest.quest.battleStarted = true;
        character.activeQuest.enemy = randomEnemy;
      }
    }
    await character.save();
    res.json(character);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
}
