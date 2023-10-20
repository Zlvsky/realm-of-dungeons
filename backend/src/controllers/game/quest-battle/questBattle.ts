import { Request, Response } from "express";
import { Character } from "../../../schemas/character/characterSchema";
import { getAttackDamage } from "../../../utils/getAttackDamage";
import getValuesWithStatistics from "../../../gameUtils/characters/getValuesWithStatistics";
import handleUsePotion from "./helpers/handleUsePotion";
import addExperienceToStat from "../../../gameUtils/characters/addExperienceToStat";

export const characterAttack = async (req: Request, res: Response) => {
  const { characterId, attackPower } = req.body;
  try {
    const character = await Character.findById(characterId);

    if (!character)
      return res.status(404).json({ message: "Character not found" });

    const { activeQuest } = character;
    const { enemy, quest } = activeQuest;

    if (!enemy) return res.status(404).json({ message: "Enemy not found" });

    if (!quest) return res.status(404).json({ message: "Quest not found" });

    if (quest.whosTurn !== 1)
      return res.status(400).json({ message: "Not your turn" });

    if (quest.battleWinner)
      return res.status(400).json({ message: "Battle already ended" });

    getValuesWithStatistics(character);
    let attackDamage;
    const minDmg = character.updatedValues.minDmg;
    const maxDmg = character.updatedValues.maxDmg;

    switch (attackPower) {
      case "low":
        attackDamage = getAttackDamage(minDmg, maxDmg, 90, 0.5);
        break;
      case "medium":
        attackDamage = getAttackDamage(minDmg, maxDmg, 85, 0.75);
        break;
      case "strong":
        attackDamage = getAttackDamage(minDmg, maxDmg, 70, 1);
        break;
      default:
        return res.status(404).json({ message: "Attack not found" });
    }

    enemy.health -= attackDamage;

    if (attackDamage === 0) {
      activeQuest.textLogs.push("You missed");
    } else {
      await addExperienceToStat(character, "weapon")
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

export const characterUsePotion = async (req: Request, res: Response) => {
  const { characterId } = req.body;
  try {
    const character = await Character.findById(characterId);

    if (!character)
      return res.status(404).json({ message: "Character not found" });

    const { activeQuest, equipment } = character;
    const { quest } = activeQuest;

    if (!quest) return res.status(404).json({ message: "Quest not found" });

    if (quest.whosTurn !== 1)
      return res.status(400).json({ message: "Not your turn" });

    if (quest.battleWinner)
      return res.status(400).json({ message: "Battle already ended" });

    const equippedPotion = equipment.find(item => item.type === "potion");

    if (!equippedPotion || !equippedPotion.item)
      return res.status(400).json({ message: "No potion found in equipment" });

    const usedPotion = handleUsePotion(equippedPotion.item, character);

    if (!usedPotion) 
      return res.status(400).json({ message: "You can't use that potion" });

    activeQuest.textLogs.push(usedPotion);
    
    quest.whosTurn = 2;

    equippedPotion.item = null;

    await character.save();
    return res.json("success");
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};
