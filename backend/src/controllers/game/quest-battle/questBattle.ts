// 1. generate enemy - name, stats, damage, skills, avatar, level, health
// 2. function to handle Computer character moves, attacks etc.
// 3. function to handle weapon attacks
// 4. function to handle user skills
// 5. function to handle potions
// 6. handle end of battle

import { Request, Response } from "express";
import { ICharacter } from "../../../types/account/MainInterfaces";
import { Character } from "../../../schemas/account/characterSchema";

export const initQuestBattle = async (req: Request, res: Response) => {
  const { characterId } = req.body;
  try {
    const character: ICharacter | null = await Character.findById(characterId);
    if (!character) return res.status(404).json({ message: "Character not found" });
    // here
  } catch (err) {}
};
