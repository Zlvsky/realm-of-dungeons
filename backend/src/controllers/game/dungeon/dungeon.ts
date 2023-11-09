import { Request, Response } from "express";

import { ICharacter } from "../../../types/account/MainInterfaces";
import { Character } from "../../../schemas/character/characterSchema";

export const startQuestBattle = async (req: Request, res: Response) => {
  const { characterId } = req.body;
  try {
    const character: ICharacter | null = await Character.findById(characterId);
    if (!character) {
      return res.status(404).json({ message: "Character not found" });
    }

    const realmDungeon = character.dungeons.find((dungeon => dungeon.realm === character.realms.currentRealm));

    if (!realmDungeon)
        return res.status(400).json({ message: "You don't have access to that dungeon" });

    if (character.activeQuest.quest && character.activeQuest.timeStarted) {
      const now = new Date();
      const dungeonRenewTime = realmDungeon.dungeonRenewDate ? new Date(realmDungeon.dungeonRenewDate) : null;
      if (!dungeonRenewTime || now > dungeonRenewTime) {
        realmDungeon.isBattleStarted = true;
        realmDungeon.dungeonRenewDate = new Date().toISOString();
      }
    }
    await character.save();
    res.json(character);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
