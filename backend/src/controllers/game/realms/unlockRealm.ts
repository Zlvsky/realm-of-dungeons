import { Request, Response } from "express";
import { Character } from "../../../schemas/character/characterSchema";
import generateQuests from "../../../gameUtils/quests/generateQuests";

const getOrbRealm = (id: number) => {
  switch (id) {
    case 100:
      return "CRYPT";
    default:
      return false;
  }
}

export const unlockRealm = async (req: Request, res: Response) => {
  const { characterId } = req.body;
  try {
    const character = await Character.findById(characterId);

    if (!character)
      return res.status(404).json({ message: "Character not found" });

    const orbInInventory = character.inventory.find(el => el?.item?.type === "realm orb");

    if (!orbInInventory) return res.json("success");

    const realm: any = getOrbRealm(orbInInventory.item?.itemId!);

    if (!realm) return res.json("success");

    if (character.realms.availableRealms.includes(realm))
      return res.json("success");

    character.realms.availableRealms.push(realm);

    orbInInventory.item = null;

    character.availableQuests.push({
      realm: realm,
      finishedQuests: 0,
      quests: generateQuests(realm, character.progression.level, false),
    });
    
    await character.save();
    return res.json("success");
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};