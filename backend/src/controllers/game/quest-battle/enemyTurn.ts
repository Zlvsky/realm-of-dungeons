import { Request, Response } from "express";
import { getAttackDamage } from "../../../utils/getAttackDamage";
import { Character } from "../../../schemas/account/characterSchema";
import { getCharacterWithItemValues } from "../../account/characters";
import getValuesWithStatistics from "../../../gameUtils/characters/getValuesWithStatistics";

export const enemyTurn = async (req: Request, res: Response) => {
  const { characterId } = req.body;
  try {
    const character = await Character.findById(characterId)
      .populate({
        path: "equipment.item",
        model: "Item",
      })
      .exec();

    if (!character)
      return res.status(404).json({ message: "Character not found" });

    const { activeQuest } = character;
    const enemy = activeQuest?.enemy;
    const quest = activeQuest?.quest;

    if (!enemy) return res.status(404).json({ message: "Enemy not found" });
    if (!quest) return res.status(404).json({ message: "Quest not found" });
    if (quest.whosTurn !== 2) return res.status(404).json({ message: "Not enemy turn" });
    if (quest.battleWinner) return res.status(404).json({ message: "Battle already ended" });

    const characterWithItemValues = getCharacterWithItemValues(character);
    character.heroValuesWithItems = characterWithItemValues;
    getValuesWithStatistics(character);
    const enemyDamage = getAttackDamage(
      enemy.damage,
      70,
      2,
      characterWithItemValues.armor
    );

    character.heroValues.currentHealth -= enemyDamage;
    

    if (enemyDamage === 0) {
      activeQuest.textLogs.push(`- ${enemy.name} missed attack`);
    } else {
      activeQuest.textLogs.push(`- ${enemy.attackText} ${enemyDamage} damage`);
    }

    if(character.heroValues.currentHealth <= 0) {
      quest.battleWinner = 2;
    } else {
      quest.whosTurn = 1;
    }

    await character.save();
    return res.json("success");
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};