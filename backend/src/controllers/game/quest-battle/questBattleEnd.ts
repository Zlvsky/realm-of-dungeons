import { Request, Response } from "express";
import { Character } from "../../../schemas/character/characterSchema";
import levelUpIfReady from "../../../gameUtils/characters/levelUpIfReady";
import generateQuests from "../../../gameUtils/quests/generateQuests";
import { checkAuth } from "../../../utils/checkAuth";

export const questBattleEnd = async (req: Request, res: Response) => {
  const { characterId } = req.body;
  try {
    const character = await Character.findById(characterId);

    if (!character)
      return res.status(404).json({ message: "Character not found" });

    const isAuthenticated = checkAuth(character.owner, req.headers.authorization);
    if (!isAuthenticated) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const { activeQuest } = character;
    const enemy = activeQuest?.enemy;
    const quest = activeQuest?.quest;
    const currentRealm = character.realms.currentRealm;

    if (!enemy) return res.status(404).json({ message: "Enemy not found" });
    if (!quest) return res.status(404).json({ message: "Quest not found" });
    if (!quest.battleWinner)
      return res.status(404).json({ message: "Battle is not ended" });

    if (quest.battleWinner === 1) {
        character.generalValues.gold = Math.round((character.generalValues.gold + quest.rewards.gold) * 100) / 100;
        character.progression.experience += quest.rewards.xp;
        if (quest.rewards?.item) {
          const freeInventorySlot = character.inventory.find(
            (slot) => slot.item === null
          );
          if (freeInventorySlot) freeInventorySlot.item = quest.rewards.item;
        }
        levelUpIfReady(character);
    } else if (quest.battleWinner === 2) {
        character.updatedValues.health = 0;
    }

    activeQuest.enemy = null;
    activeQuest.quest = null;
    activeQuest.timeStarted = null;
    activeQuest.textLogs = [];

    const availableQuestsIndex = character.availableQuests.findIndex(el => el.realm === currentRealm)!;
    const generatedQuest = await generateQuests(currentRealm, character.progression.level);
    character.availableQuests[availableQuestsIndex].quests = generatedQuest;
    character.availableQuests[availableQuestsIndex].finishedQuests += 1;

    await character.save();
    return res.json("success");
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};
