import { Request, Response } from "express";
import { Character } from "../../../schemas/character/characterSchema";
import { checkAuth } from "../../../utils/checkAuth";

export const templeHealing = async (req: Request, res: Response) => {
  const { characterId } = req.body;
  try {
    const character = await Character.findById(characterId);

    if (!character)
      return res.status(404).json({ message: "Character not found" });

    const isAuthenticated = checkAuth(character.owner, req.headers.authorization);
    if (!isAuthenticated) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    if (character.extras.availableHeals === 0)
      return res.status(404).json({ message: "All available heals were used" });
    if (character.updatedValues.health === character.updatedValues.maxHealth)
      return res.status(404).json({ message: "You have full health" });

    if (!character.extras.healRenewDate) {
      var nextDay = new Date();
      nextDay.setDate(nextDay.getDate() + 1);
      character.extras.healRenewDate = nextDay.toISOString();
    }
    
    character.updatedValues.health = character.updatedValues.maxHealth;
    character.extras.availableHeals -= 1;


    await character.save();
    return res.json("success");
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};
