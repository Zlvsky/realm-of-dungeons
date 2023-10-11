import { Request, Response } from "express";
import { Character } from "../../../schemas/character/characterSchema";

const getRealmTravelFee = (realm: string) => {
    switch (realm) {
        case "CAVE":
            return 1.50;
        case "CRYPT":
            return 6.00;        
    }
}

export const changeRealm = async (req: Request, res: Response) => {
  const { characterId, realm } = req.body;
  try {
    const character = await Character.findById(characterId);

    if (!character)
      return res.status(404).json({ message: "Character not found" });

    const realmTravelFee = getRealmTravelFee(realm);

    if (character.generalValues.gold < realmTravelFee!)
      return res.status(400).json({ message: "Not enough gold" });

    character.generalValues.gold -= realmTravelFee!; 
    character.currentRealm = realm;

    await character.save();
    return res.json("success");
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};
