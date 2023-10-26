import { Request, Response } from "express";
import { Character } from "../../../schemas/character/characterSchema";

const getRealmTravelFee = (realm: string) => {
    switch (realm) {
      case "CAVERNS":
        return 1.5;
      case "CRYPT":
        return 6.0;
    }
}

export const changeRealm = async (req: Request, res: Response) => {
  const { characterId, realm } = req.body;
  try {
    const character = await Character.findById(characterId);

    if (!character)
      return res.status(404).json({ message: "Character not found" });

    if (!character.realms.availableRealms.includes(realm))
      return res.status(400).json({ message: "You don't have access to this realm" });

    if (Boolean(character.activeQuest.quest)) 
      return res.status(400).json({ message: "Finish quest first" });

    const realmTravelFee = getRealmTravelFee(realm);

    if (character.generalValues.gold < realmTravelFee!)
      return res.status(400).json({ message: "Not enough gold" });

    character.generalValues.gold -= realmTravelFee!; 
    character.realms.currentRealm = realm;

    await character.save();
    return res.json("success");
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};
