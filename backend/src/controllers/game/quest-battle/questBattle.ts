// 1. generate enemy - name, stats, damage, skills, avatar, level, health
// 2. function to handle Computer character moves, attacks etc.
// 3. function to handle weapon attacks
// 4. function to handle user skills
// 5. function to handle potions
// 6. handle end of battle

import { Request, Response } from "express";
import { ICharacter } from "../../../types/account/MainInterfaces";
import { Character } from "../../../schemas/account/characterSchema";
import { getCharacterWithItemValues } from "../../account/characters";

export const calcDamage = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

const getHeroAttackDamage = (heroDamage: number, chanceToHit: number, powerIndex: number) => {
  const randomNumber = Math.random() * 100;
  if (100 - chanceToHit > randomNumber) return 0;
  const damage = calcDamage(heroDamage / powerIndex, heroDamage);
  return Math.round(damage);
};

export const characterAttack = async (req: Request, res: Response) => {
  const { characterId, attackPower } = req.body;
  try {
    const character: ICharacter | null = await Character.findById(characterId);
    if (!character) return res.status(404).json({ message: "Character not found" });
    if (!character.activeQuest.enemy) return res.status(404).json({ message: "Enemy not found" });
    if (!character.activeQuest.quest) return res.status(404).json({ message: "Quest not found" });
    // if (character.activeQuest.quest.whosTurn !== 1) return res.status(404).json({ message: "Not your turn" });
    const characterWithItemValues = getCharacterWithItemValues(character);

    let attackDamage;
    if (attackPower === "low") attackDamage = getHeroAttackDamage(characterWithItemValues.damage, 80, 5);
    else if (attackPower === "medium") attackDamage = getHeroAttackDamage(characterWithItemValues.damage, 65, 3);
    else if (attackPower === "strong") attackDamage = getHeroAttackDamage(characterWithItemValues.damage, 50, 1.5);
    else return res.status(404).json({ message: "Attack not found" });

    character.activeQuest.enemy.health -= attackDamage;
    character.activeQuest.quest.whosTurn = 2;
    
    if (attackDamage === 0) {
      character.activeQuest.textLogs.push("You missed");
    } else {
      character.activeQuest.textLogs.push(
        "You dealt " + attackDamage + " damage"
      );
    }
    
    await character.save();
    return res.json("success");
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
