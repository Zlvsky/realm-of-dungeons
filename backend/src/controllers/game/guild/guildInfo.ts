import mongoose from "mongoose";
import { Request, Response } from "express";
import getUserIdFromToken from "../../../utils/getUserIdFromToken";
import { Guild } from "../../../schemas/game/guildSchema";
import { checkAuth } from "../../../utils/checkAuth";
import { Character } from "../../../schemas/character/characterSchema";

export const guildInfo = async (req: Request, res: Response) => {
  const { characterId } = req.body;

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

    const guildId = character.guild?.memberOf;

    if (!guildId) return res.status(400).json({ message: "Unauthorized" });

    const guild = await Guild.findById(guildId)
      .populate({
        path: "leader",
        select: "nickname progression.level",
      })
      .populate({
        path: "requests",
        select: "nickname progression.level",
      })
      .populate({
        path: "invites",
        select: "nickname progression.level",
      })
      .populate({
        path: "members",
        select: "title",
        populate: {
          path: "characterId",
          select: "nickname progression.level",
        },
      })
      .exec();

    if (!guild) return res.status(400).json({ message: "Guild not found" });

    const characterObjectId = new mongoose.mongo.ObjectId(character._id);

    if (
      !guild?.members.find((el) => characterObjectId.equals(el.characterId._id))
    )
      return res.status(400).json({ message: "Unauthorized" });

    res.json(guild);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
