import { Request, Response } from "express";
import { Character } from "../../../schemas/character/characterSchema";
import getUserIdFromToken from "../../../utils/getUserIdFromToken";
import { checkAuth } from "../../../utils/checkAuth";
import { Guild } from "../../../schemas/game/guildSchema";

export const getGuildInvites = async (req: Request, res: Response) => {
  const { characterId } = req.params;

  try {
    const userId = getUserIdFromToken(req.headers.authorization);
    if (!userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    if (!characterId)
      return res.status(400).json({ message: "Character not found" });

    const character = await Character.findById(characterId);

    if (!character) {
      return res.status(400).json({ message: "Character not found" });
    }

    const isAuthenticated = checkAuth(
      character.owner,
      req.headers.authorization
    );
    if (!isAuthenticated) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    if (character.guild.invites.length === 0) return res.status(200).json({items: []});

    const ivnites = await Guild.find({ _id: { $in: character.guild.invites } })
      .select("_id name")
      .limit(6)
      .exec();

    const response = {
      items: ivnites,
    };
    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
