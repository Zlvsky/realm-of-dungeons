import { Request, Response } from "express";
import { Character } from "../../../schemas/character/characterSchema";
import levelUpIfReady from "../../../gameUtils/characters/levelUpIfReady";

export const questBattleEnd = async (req: Request, res: Response) => {
  const { characterId } = req.body;
  try {
    const character = await Character.findById(characterId);

    if (!character)
      return res.status(404).json({ message: "Character not found" });

    const { activeQuest } = character;
    const enemy = activeQuest?.enemy;
    const quest = activeQuest?.quest;

    if (!enemy) return res.status(404).json({ message: "Enemy not found" });
    if (!quest) return res.status(404).json({ message: "Quest not found" });
    if (!quest.battleWinner)
      return res.status(404).json({ message: "Battle is not ended" });

    if (quest.battleWinner === 1) {
        character.generalValues.gold += quest.rewards.gold;
        character.progression.experience += quest.rewards.xp;
        levelUpIfReady(character);
    } else if (quest.battleWinner === 2) {
        character.updatedValues.health = 0;
    }

    activeQuest.enemy = null;
    activeQuest.quest = null;
    activeQuest.timeStarted = null;
    activeQuest.textLogs = [];

    await character.save();
    return res.json("success");
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};
