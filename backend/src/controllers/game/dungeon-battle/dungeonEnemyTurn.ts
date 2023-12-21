import { Request, Response } from "express";
import { getAttackDamage } from "../../../utils/getAttackDamage";
import { Character } from "../../../schemas/character/characterSchema";
import getValuesWithStatistics from "../../../gameUtils/characters/getValuesWithStatistics";
import { getRealmDungeon } from "../../../gameUtils/dungeons/getRealmDungeon";

export const dungeonEnemyTurn = async (req: Request, res: Response) => {
  const { characterId } = req.body;
  try {
    const character = await Character.findById(characterId);

    const dataToReturn: any = {
      who: 1,
      damage: "DEALT",
    };

    if (!character)
      return res.status(404).json({ message: "Character not found" });

    const realmDungeon = getRealmDungeon(character);

    if (!realmDungeon)
      return res
        .status(400)
        .json({ message: "You don't have access to that dungeon" });

    const enemy = realmDungeon?.battle.enemy;
    const battle = realmDungeon?.battle;

    if (!enemy) return res.status(404).json({ message: "Enemy not found" });
    if (!battle) return res.status(404).json({ message: "Battle not found" });
    if (battle.whosTurn !== 2)
      return res.status(404).json({ message: "Not enemy turn" });
    if (battle.battleWinner)
      return res.status(404).json({ message: "Battle already ended" });

    getValuesWithStatistics(character);
    const enemyDamage = getAttackDamage(
      enemy.damage,
      enemy.damage,
      70,
      1,
      character.updatedValues.armor
    );

    character.updatedValues.health -= enemyDamage;
    

    if (enemyDamage <= 0) {
      battle.textLogs.push(`- ${enemy.name} missed attack`);
      dataToReturn.text = "MISSED";
    } else {
      battle.textLogs.push(`- ${enemy.attackText} ${enemyDamage} damage`);
      dataToReturn.text = `-${enemyDamage}`;
    }

    if (character.updatedValues.health <= 0) {
      battle.battleWinner = 2;
    } else {
      battle.whosTurn = 1;
    }

    await character.save();
    return res.status(200).json(dataToReturn);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};
