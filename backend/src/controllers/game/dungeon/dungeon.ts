import { Request, Response } from "express";

import { ICharacter } from "../../../types/account/MainInterfaces";
import { Character } from "../../../schemas/character/characterSchema";
import { getDungeonEnemies } from "../../../gameUtils/dungeons/getDungeonEnemies";
import { cavernsDungeonEnemies } from "../../../gameUtils/dungeons/caverns/cavernsDungeonEnemies";
import { cryptDungeonEnemies } from "../../../gameUtils/dungeons/crypt/cryptDungeonEnemies";
import { getRealmDungeon } from "../../../gameUtils/dungeons/getRealmDungeon";
import { checkAuth } from "../../../utils/checkAuth";

export const getRealmDungeonEnemies = async (req: Request, res: Response) => {
  const { characterId } = req.params;
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

    switch (currentRealm) {
      case "CAVERNS":
        return res.status(200).json(cavernsDungeonEnemies);
      case "CRYPT":
        return res.status(200).json(cryptDungeonEnemies);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

export const startDungeonBattle = async (req: Request, res: Response) => {
  const { characterId } = req.body;
  try {
    const character: ICharacter | null = await Character.findById(characterId);
    if (!character) {
      return res.status(404).json({ message: "Character not found" });
    }

    const activeQuest = character.activeQuest.quest;

    if (activeQuest)
      return res.status(400).json({ message: "Finish quest first" });

    const realmDungeon = getRealmDungeon(character);

    if (!realmDungeon)
      return res
        .status(400)
        .json({ message: "You don't have access to that dungeon" });

    if (realmDungeon.battle.isBattleStarted)
      return res.status(400).json({ message: "Finish dungeon battle first" });

    const maxHealth = character.updatedValues.maxHealth;
    const currentHealth = character.updatedValues.health;

    if (currentHealth / maxHealth < 0.1)
      return res.status(400).json({ message: "You are too wounded" });

    if (!realmDungeon.dungeonRenewDate) {
      const dungeonEnemy = await getDungeonEnemies(character, realmDungeon);
      realmDungeon.battle.enemy = dungeonEnemy;
      realmDungeon.battle.isBattleStarted = true;
      realmDungeon.dungeonRenewDate = new Date().toISOString();
    } else {
      const now = new Date();
      const dungeonRenewTime = new Date(realmDungeon.dungeonRenewDate);
      if (now > dungeonRenewTime) {
        const dungeonEnemy = await getDungeonEnemies(character, realmDungeon);
        realmDungeon.battle.enemy = dungeonEnemy;
        realmDungeon.battle.isBattleStarted = true;
        const now = new Date();
        now.setHours(now.getHours() + 1);
        realmDungeon.dungeonRenewDate = now.toISOString();
      }
    }

    await character.save();
    res.json(character);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
