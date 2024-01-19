import { Request, Response } from "express";
import { Character } from "../../../schemas/character/characterSchema";
import levelUpIfReady from "../../../gameUtils/characters/levelUpIfReady";
import { getRealmDungeon } from "../../../gameUtils/dungeons/getRealmDungeon";
import { checkAuth } from "../../../utils/checkAuth";

export const dungeonBattleEnd = async (req: Request, res: Response) => {
  const { characterId } = req.body;
  try {
    const character = await Character.findById(characterId);

    if (!character)
      return res.status(404).json({ message: "Character not found" });

    const isAuthenticated = checkAuth(character.owner, req.headers.authorization);
      if (!isAuthenticated) {
        return res.status(403).json({ message: "Unauthorized" });
      }

    const realmDungeon = getRealmDungeon(character);

    if (!realmDungeon)
      return res
        .status(400)
        .json({ message: "You don't have access to that dungeon" });

    const enemy = realmDungeon?.battle.enemy;
    const battle = realmDungeon?.battle;

    if (!enemy) return res.status(404).json({ message: "Enemy not found" });
    if (!battle) return res.status(404).json({ message: "Quest not found" });

    if (!battle.battleWinner)
      return res.status(404).json({ message: "Battle is not ended" });

    if (battle.battleWinner === 1) {
      realmDungeon.currentMonster += 1;

      character.generalValues.gold =
        Math.round((character.generalValues.gold + enemy.rewards.gold) * 100) /
        100;

      character.progression.experience += enemy.rewards.xp;
      if (character.progression?.reputation)
        character.progression.reputation += enemy.rewards.reputation;

      if (enemy.rewards?.item) {
        const freeInventorySlot = character.inventory.find(
          (slot) => slot.item === null
        );

        if (freeInventorySlot) freeInventorySlot.item = enemy.rewards.item;
      }
      levelUpIfReady(character);
    } else if (battle.battleWinner === 2) {
      character.updatedValues.health = 0;
    }

    battle.enemy = null;
    battle.battleWinner = null;
    battle.whosTurn = 1;
    battle.isBattleStarted = false;
    battle.textLogs = [];

    await character.save();
    return res.json("success");
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};
