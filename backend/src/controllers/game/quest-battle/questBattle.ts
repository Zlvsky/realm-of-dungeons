import { Request, Response } from "express";
import { Character } from "../../../schemas/character/characterSchema";
import { getCharacterWithItemValues } from "../../account/characters";
import { getAttackDamage } from "../../../utils/getAttackDamage";
import getValuesWithStatistics from "../../../gameUtils/characters/getValuesWithStatistics";

export const characterAttack = async (req: Request, res: Response) => {
  const { characterId, attackPower } = req.body;
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
    const { enemy, quest } = activeQuest;

    if (!enemy) return res.status(404).json({ message: "Enemy not found" });

    if (!quest) return res.status(404).json({ message: "Quest not found" });

    if (quest.whosTurn !== 1)
      return res.status(404).json({ message: "Not your turn" });

    if (quest.battleWinner)
      return res.status(404).json({ message: "Battle already ended" });

    const characterWithItemValues = getCharacterWithItemValues(character);
    character.heroValuesWithItems = characterWithItemValues;
    getValuesWithStatistics(character);
    let attackDamage;

    switch (attackPower) {
      case "low":
        attackDamage = getAttackDamage(character.heroValuesWithItems.damage, 80, 5);
        break;
      case "medium":
        attackDamage = getAttackDamage(character.heroValuesWithItems.damage, 65, 3);
        break;
      case "strong":
        attackDamage = getAttackDamage(character.heroValuesWithItems.damage, 50, 1.5);
        break;
      default:
        return res.status(404).json({ message: "Attack not found" });
    }

    enemy.health -= attackDamage;

    if (attackDamage === 0) {
      activeQuest.textLogs.push("You missed");
    } else {
      activeQuest.textLogs.push(`You dealt ${attackDamage} damage`);
    }

    if (enemy.health <= 0) {
      quest.battleWinner = 1;
    } else {
      quest.whosTurn = 2;
    }

    await character.save();
    return res.json("success");
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};
