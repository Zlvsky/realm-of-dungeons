import { Request, Response } from "express";
import { Character } from "../../../schemas/character/characterSchema";
import { getAttackDamage } from "../../../utils/getAttackDamage";
import getValuesWithStatistics from "../../../gameUtils/characters/getValuesWithStatistics";
import addExperienceToStat from "../../../gameUtils/characters/addExperienceToStat";
import { ICharacter } from "../../../types/account/MainInterfaces";
import { getRealmDungeon } from "../../../gameUtils/dungeons/getRealmDungeon";
import { checkAuth } from "../../../utils/checkAuth";

interface ICharacterAttack {
  characterId: string;
  attackPower: "low" | "medium" | "strong";
  battleType: "QUEST" | "DUNGEON";
}

const getAttackDamageToEnemy = (
  character: ICharacter,
  attackPower: ICharacterAttack["attackPower"]
) => {
  let attackDamage = undefined;
  const minDmg = character.updatedValues.minDmg;
  const maxDmg = character.updatedValues.maxDmg;
  const critChance = character.updatedValues?.critChance;

  switch (attackPower) {
    case "low":
      attackDamage = getAttackDamage(minDmg, maxDmg, 90, 0.5, 0, critChance);
      break;
    case "medium":
      attackDamage = getAttackDamage(minDmg, maxDmg, 85, 0.75, 0, critChance);
      break;
    case "strong":
      attackDamage = getAttackDamage(minDmg, maxDmg, 70, 1, 0, critChance);
      break;
  }

  if (!attackDamage && attackDamage !== 0) return false;

  return attackDamage;
};

export const characterAttack = async (req: Request, res: Response) => {
  const { characterId, attackPower, battleType }: ICharacterAttack = req.body;
  try {
    const character = await Character.findById(characterId);

    const dataToReturn: any = {
      who: 2,
      damage: "DEALT"
    }

    if (!character)
      return res.status(404).json({ message: "Character not found" });

    const isAuthenticated = checkAuth(character.owner, req.headers.authorization);
    if (!isAuthenticated) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const { activeQuest } = character;

    if (battleType === "QUEST") {
      const { enemy, quest } = activeQuest;

      if (!enemy) return res.status(404).json({ message: "Enemy not found" });

      if (!quest) return res.status(404).json({ message: "Quest not found" });

      if (quest.whosTurn !== 1)
        return res.status(400).json({ message: "Not your turn" });

      if (quest.battleWinner)
        return res.status(400).json({ message: "Battle already ended" });

      getValuesWithStatistics(character);

      const attackDamage = getAttackDamageToEnemy(character, attackPower);

      if (!attackDamage)
        return res.status(400).json({ message: "Attack not found" });

      enemy.health -= attackDamage.dmg;

      if (attackDamage?.missed) {
        activeQuest.textLogs.push("You missed");
        dataToReturn.text = "MISSED";
      } else if (attackDamage?.evaded) {
        activeQuest.textLogs.push("Your hit was evaded");
        dataToReturn.text = "EVADED";
      } else {

        let isCrit = attackDamage.crit;
        await addExperienceToStat(character, "weapon");

        if (isCrit) {
          activeQuest.textLogs.push(`You critically dealt ${attackDamage.dmg} damage`);
          dataToReturn.text = `-${attackDamage.dmg} CRITICAL!`;
        } else {
          activeQuest.textLogs.push(`You dealt ${attackDamage.dmg} damage`);
          dataToReturn.text = `-${attackDamage.dmg}`;
        }
        
      }

      if (enemy.health <= 0) {
        quest.battleWinner = 1;
      } else {
        quest.whosTurn = 2;
      }
    } else if (battleType === "DUNGEON") {
      const realmDungeon = getRealmDungeon(character);

      if (!realmDungeon)
        return res.status(404).json({ message: "Dungeon not found" });

      if (!realmDungeon.battle.enemy)
        return res.status(404).json({ message: "Enemy not found" });

      if (realmDungeon.battle.whosTurn !== 1)
        return res.status(400).json({ message: "Not your turn" });

      if (realmDungeon.battle.battleWinner)
        return res.status(400).json({ message: "Battle already ended" });

      getValuesWithStatistics(character);

      const attackDamage = getAttackDamageToEnemy(character, attackPower);

      if (!attackDamage)
        return res.status(400).json({ message: "Attack not found" });

      realmDungeon.battle.enemy.health -= attackDamage.dmg;

      if (attackDamage?.missed) {
        realmDungeon.battle.textLogs.push("You missed");
        dataToReturn.text = "MISSED";
      } else if (attackDamage?.evaded) {
        activeQuest.textLogs.push("Your hit was evaded");
        dataToReturn.text = "EVADED";
      } else {

        let isCrit = attackDamage.crit;
        await addExperienceToStat(character, "weapon");
        
        if (isCrit) {
          realmDungeon.battle.textLogs.push(`You critically dealt ${attackDamage} damage`);
          dataToReturn.text = `-${attackDamage} CRITICAL!`;
        } else {
          realmDungeon.battle.textLogs.push(`You dealt ${attackDamage} damage`);
          dataToReturn.text = `-${attackDamage}`;
        }
        
      }

      if (realmDungeon.battle.enemy.health <= 0) {
        realmDungeon.battle.battleWinner = 1;
      } else {
        realmDungeon.battle.whosTurn = 2;
      }
    } else {
      return res.status(400).json({ message: "Battle type must be provided" });
    }

    await character.save();
    return res.status(200).json(dataToReturn);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};
