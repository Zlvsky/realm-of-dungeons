import { Request, Response } from "express";

import { ICharacter } from "../../../types/account/MainInterfaces";
import { Character } from "../../../schemas/account/characterSchema";

export const updateActiveQuest = async (req: Request, res: Response) => {
    const { characterId, questId }= req.body;
    try {
        const character: ICharacter | null = await Character.findById(characterId);
        if (!character) {
          return res.status(404).json({ message: "Character not found" });
        }
        
        const selectedQuest = character.availableQuests.find(
          quest => quest._id.toString() === questId
        );
        console.log(character.availableQuests);
        if (!selectedQuest) {
          return res.status(404).json({ message: "Quest not found" });
        }
        character.activeQuest.quest = selectedQuest;
        character.activeQuest.timeStarted = new Date().toISOString();
        await character.save();
        res.json(character);
    } catch (err) {
         console.error(err);
         res.status(500).json({ message: "Server Error" });
  
    }
}