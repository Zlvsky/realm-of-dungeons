import { Request, Response } from "express";
import { Character } from "../../../schemas/character/characterSchema";
import { getRealmDungeon } from "../../../gameUtils/dungeons/getRealmDungeon";
import { checkAuth } from "../../../utils/checkAuth";

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

    const isAuthenticated = checkAuth(character.owner, req.headers.authorization);
    if (!isAuthenticated) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const realmDungeon = getRealmDungeon(character);

    if (!character.realms.availableRealms.includes(realm))
      return res.status(400).json({ message: "You don't have access to this realm" });

    if (Boolean(character.activeQuest.quest)) 
      return res.status(400).json({ message: "Finish quest first" });

    if (realmDungeon.battle.isBattleStarted)
      return res.status(400).json({ message: "Finish dungeon first" });

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
