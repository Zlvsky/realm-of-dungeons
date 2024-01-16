import { Request, Response } from "express";
import { Character } from "../../../schemas/character/characterSchema";
import handleUsePotion from "./helpers/handleUsePotion";
import { getRealmDungeon } from "../../../gameUtils/dungeons/getRealmDungeon";
import { checkAuth } from "../../../utils/checkAuth";

interface ICharacterUsePotion { 
    characterId: string;
     battleType: "QUEST" | "DUNGEON";
    }

export const characterUsePotion = async (req: Request, res: Response) => {
  const { characterId, battleType }: ICharacterUsePotion = req.body;
  try {
    const character = await Character.findById(characterId);
    const dataToReturn: any = {
      who: 1,
      damage: "HEALED",
    };

    if (!character)
      return res.status(404).json({ message: "Character not found" });

    const isAuthenticated = checkAuth(character.owner, req.headers.authorization);
    if (!isAuthenticated) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const { activeQuest, equipment } = character;

     const equippedPotion = equipment.find((item) => item.type === "potion");

     if (!equippedPotion || !equippedPotion.item)
       return res.status(400).json({ message: "No potion found in equipment" });

     

    if (battleType === "QUEST") {
        const { quest } = activeQuest;

        if (!quest) return res.status(404).json({ message: "Quest not found" });

        if (quest.whosTurn !== 1)
          return res.status(400).json({ message: "Not your turn" });

        if (quest.battleWinner)
          return res.status(400).json({ message: "Battle already ended" });

          const usedPotion = handleUsePotion(equippedPotion.item, character);

          if (!usedPotion)
            return res
              .status(400)
              .json({ message: "You can't use that potion" });

        activeQuest.textLogs.push(usedPotion);

        quest.whosTurn = 2;

        dataToReturn.text = "HEALED";

    } else if (battleType === "DUNGEON") {

        const realmDungeon = getRealmDungeon(character);

        if (!realmDungeon)
          return res
            .status(400)
            .json({ message: "You don't have access to that dungeon" });

            if (realmDungeon.battle.whosTurn !== 1)
              return res.status(400).json({ message: "Not your turn" });

            if (realmDungeon.battle.battleWinner)
              return res.status(400).json({ message: "Battle already ended" });

            const usedPotion = handleUsePotion(equippedPotion.item, character);

            if (!usedPotion)
              return res
                .status(400)
                .json({ message: "You can't use that potion" });

            realmDungeon.battle.textLogs.push(usedPotion);

            realmDungeon.battle.whosTurn = 2;

            dataToReturn.text = "HEALED";
    } else {
        return res.status(400).json({ message: "Battle type must be provided" });
    }

    

    equippedPotion.item = null;

    await character.save();
    return res.status(200).json(dataToReturn);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};
