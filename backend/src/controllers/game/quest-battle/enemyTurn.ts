import { Request, Response } from "express";
import { getAttackDamage } from "../../../utils/getAttackDamage";
import { ICharacter } from "../../../types/account/MainInterfaces";
import { Character } from "../../../schemas/account/characterSchema";

export const enemyTurn = async (req: Request, res: Response) => {
  const { characterId }: { characterId: string } = req.body;
  try {
    const character: ICharacter | null = await Character.findById(characterId);
    if (!character)
      return res.status(404).json({ message: "Character not found" });
    const enemy = character?.activeQuest.enemy;
    if (!enemy) return res.status(404).json({ message: "Enemy not found" });
    if (!character.activeQuest.quest)
      return res.status(404).json({ message: "Quest not found" });

    const enemyDamage = getAttackDamage(enemy.damage, 70, 1);
    character.heroValues.currentHealth -= enemyDamage;
    character.activeQuest.quest.whosTurn = 1;

     if (enemyDamage === 0) {
       character.activeQuest.textLogs.push(`- ${enemy.name} missed attack`);
     } else {
       character.activeQuest.textLogs.push(
        `- ${enemy.attackText}  " " ${enemyDamage}`
       );
     }

     await character.save();
     return res.json("success");
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
