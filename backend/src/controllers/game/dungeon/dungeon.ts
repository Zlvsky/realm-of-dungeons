import { Request, Response } from "express";

import { ICharacter } from "../../../types/account/MainInterfaces";
import { Character } from "../../../schemas/character/characterSchema";
import { getDungeonEnemies } from "../../../gameUtils/dungeons/getDungeonEnemies";
import { cavernsDungeonEnemies } from "../../../gameUtils/dungeons/caverns/cavernsDungeonEnemies";
import { cryptDungeonEnemies } from "../../../gameUtils/dungeons/crypt/cryptDungeonEnemies";

export const getRealmDungeonEnemies = async (req: Request, res: Response) => {
  const { characterId } = req.params;
  try {
    const character: ICharacter | null = await Character.findById(characterId);
    if (!character) {
      return res.status(404).json({ message: "Character not found" });
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
}

export const startDungeonBattle = async (req: Request, res: Response) => {
  const { characterId } = req.body;
  try {
    const character: ICharacter | null = await Character.findById(characterId);
    if (!character) {
      return res.status(404).json({ message: "Character not found" });
    }

    const realmDungeonIndex = character.dungeons.findIndex((dungeon => dungeon.realm === character.realms.currentRealm));
    const realmDungeon = character.dungeons[realmDungeonIndex];


    if (!realmDungeon)
        return res.status(400).json({ message: "You don't have access to that dungeon" });

    if (!realmDungeon.battle.isBattleStarted) {
      const now = new Date();
      const dungeonRenewTime = realmDungeon.dungeonRenewDate ? new Date(realmDungeon.dungeonRenewDate) : null;
      if (dungeonRenewTime === null || now > dungeonRenewTime) {
        const dungeonEnemy = await getDungeonEnemies(character, realmDungeon);
        realmDungeon.battle.enemy = dungeonEnemy;
        realmDungeon.battle.isBattleStarted = true;
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
