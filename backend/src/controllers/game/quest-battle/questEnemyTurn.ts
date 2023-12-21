import { Request, Response } from "express";
import { getAttackDamage } from "../../../utils/getAttackDamage";
import { Character } from "../../../schemas/character/characterSchema";
import getValuesWithStatistics from "../../../gameUtils/characters/getValuesWithStatistics";

export const questEnemyTurn = async (req: Request, res: Response) => {
  const { characterId } = req.body;
  try {
    const character = await Character.findById(characterId);

    const dataToReturn: any = {
      who: 1,
      damage: "DEALT",
    };

    if (!character)
      return res.status(404).json({ message: "Character not found" });

    const { activeQuest } = character;
    const enemy = activeQuest?.enemy;
    const quest = activeQuest?.quest;

    if (!enemy) return res.status(404).json({ message: "Enemy not found" });
    if (!quest) return res.status(404).json({ message: "Quest not found" });
    if (quest.whosTurn !== 2) return res.status(404).json({ message: "Not enemy turn" });
    if (quest.battleWinner) return res.status(404).json({ message: "Battle already ended" });

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
      activeQuest.textLogs.push(`- ${enemy.name} missed attack`);
      dataToReturn.text = "MISSED";
    } else {
      activeQuest.textLogs.push(`- ${enemy.attackText} ${enemyDamage} damage`);
      dataToReturn.text = `-${enemyDamage}`;
    }

    if (character.updatedValues.health <= 0) {
      quest.battleWinner = 2;
    } else {
      quest.whosTurn = 1;
    }

    await character.save();
    return res.status(200).json(dataToReturn);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};
