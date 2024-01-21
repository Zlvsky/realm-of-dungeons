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
    const stamina = character.extras.stamina;

    if (!enemy) return res.status(404).json({ message: "Enemy not found" });
    if (!quest) return res.status(404).json({ message: "Quest not found" });
    if (!quest.battleWinner)
      return res.status(404).json({ message: "Battle is not ended" });

    if (quest.battleWinner === 1) {
        character.generalValues.gold = Math.round((character.generalValues.gold + quest.rewards.gold) * 100) / 100;
        character.progression.experience += quest.rewards.xp;
        if (quest.rewards?.reputation)
          character.progression.reputation += quest.rewards.reputation;
        if (quest.rewards?.item) {
          const freeInventorySlot = character.inventory.find(
            (slot) => slot.item === null
          );
          if (freeInventorySlot) freeInventorySlot.item = quest.rewards.item;
        }
        levelUpIfReady(character);
    } else if (quest.battleWinner === 2) {
        // SUBSTRACT REPUTATION AFTER LOSS 
        if (character.progression.reputation !== 0 && quest.rewards?.reputation) {
            if (character.progression.reputation - (quest.rewards.reputation * 3) < 0) character.progression.reputation = 0;
            else character.progression.reputation -= (quest.rewards.reputation * 3);
        }
        character.updatedValues.health = 0;
    }

    if (stamina > 0) {
      const duration = Math.round((activeQuest.quest?.duration! / 60) * 10) / 10;
      if (stamina - duration < 0) character.extras.stamina = 0;
      else character.extras.stamina = Math.round((character.extras.stamina - duration) * 10) / 10;
    }

    activeQuest.enemy = null;
    activeQuest.quest = null;
    activeQuest.timeStarted = null;
    activeQuest.textLogs = [];

    const availableQuestsIndex = character.availableQuests.findIndex(el => el.realm === currentRealm)!;
    const generatedQuest = await generateQuests(currentRealm, character.progression.level, character.extras.stamina);
    character.availableQuests[availableQuestsIndex].quests = generatedQuest;
    character.availableQuests[availableQuestsIndex].finishedQuests += 1;

    await character.save();
    return res.json("success");
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};
