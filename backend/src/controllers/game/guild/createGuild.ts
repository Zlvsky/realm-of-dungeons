import { Request, Response } from "express";
import { ICharacter } from "../../../types/account/MainInterfaces";
import { Character } from "../../../schemas/character/characterSchema";
import { checkAuth } from "../../../utils/checkAuth";
import { Guild } from "../../../schemas/game/guildSchema";

const regex = /^[0-9]*[a-zA-Z]+(\s?[a-zA-Z0-9]+)*$/

export const createGuild = async (req: Request, res: Response) => {
  const { characterId, guildName } = req.body;

  const character: ICharacter | null = await Character.findById(characterId);

  if (!character) {
    return res.status(400).json({ message: "Character not found" });
  }

  const isAuthenticated = checkAuth(character.owner, req.headers.authorization);
  if (!isAuthenticated) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  if (character.guild) 
    return res.status(403).json({ message: "You are already in Guild" });

  const guild = await Guild.findOne({ name: guildName });

  if (guild)
    return res.status(400).json({ message: "Guild name already taken" });

  if (!regex.test(guildName) || guildName.length < 3)
    return res.status(400).json({ message: "Invalid guild name" });

  if (character.generalValues.gold < 50)
    return res.status(400).json({ message: "Not enough gold" });

  character.generalValues.gold -= 50; 

  try {
    const guild = new Guild({
      name: guildName,
      leader: characterId,
      members: [
        {
            title: "LEADER",
            characterId: characterId,
        },
      ],
      reputation: 0,
      description: "",
      requests: [],
      invites: [],
      treasury: {
        gold: 0,
      },
      statistics: {
        level: 1,
        xpLevel: 1,
        goldLevel: 1,
      },
      chatLogs: [],
    });

    await guild.save();

    character.guild = guild._id;

    await Character.findOneAndUpdate(
          { _id: characterId },
          { $set: { 'guild': guild._id } }),

    res.status(200).json(character);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Error Occured" });
  }
};
