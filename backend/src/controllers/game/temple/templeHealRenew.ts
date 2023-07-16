import { Request, Response } from "express";
import { Character } from "../../../schemas/account/characterSchema";

export const templeHealRenew = async (req: Request, res: Response) => {
  const { characterId } = req.body;
  try {
    const character = await Character.findById(characterId);

    if (!character)
      return res.status(404).json({ message: "Character not found" });

    const renewDateString = character.extras.healRenewDate;
    if (!renewDateString)
      return res.status(404).json({ message: "Heal is ready" });

    const now = new Date();
    const renewDate = new Date(renewDateString);

    if (renewDate > now) return res.status(404).json({ message: "Renew not ready" });

    character.extras.availableHeals = 2;
    character.extras.healRenewDate = null;

    await character.save();
    return res.json("success");
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};
