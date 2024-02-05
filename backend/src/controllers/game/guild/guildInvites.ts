import { Request, Response } from "express";
import { Character } from "../../../schemas/character/characterSchema";
import getUserIdFromToken from "../../../utils/getUserIdFromToken";
import { checkAuth } from "../../../utils/checkAuth";
import { Guild } from "../../../schemas/game/guildSchema";
import mongoose from "mongoose";

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

    if (character.guild.invites.length === 0)
      return res.status(200).json({ items: [] });

    const ivnites = await Guild.find({ _id: { $in: character.guild.invites } })
      .select("_id name leader members reputation description statistics")
      .limit(6)
      .populate({
        path: "leader",
        select: "nickname",
      })
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

export const inviteToGuild = async (req: Request, res: Response) => {
  const { characterId, invitedCharacterId } = req.body;

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

    const invitedCharacter = await Character.findById(invitedCharacterId);

    if (!invitedCharacter) {
      return res.status(400).json({ message: "Character not found" });
    }

    if (!character.guild?.memberOf)
      return res.status(400).json({ message: "You are not in any guild" });

    const guild = await Guild.findById(character.guild.memberOf);

    if (!guild)
      return res.status(400).json({ message: "You are not in any guild" });

    const characterObjectId = new mongoose.mongo.ObjectId(character._id);
    const invitedCharacterObjectId = new mongoose.mongo.ObjectId(
      invitedCharacter._id
    );
    const guildObjectId = new mongoose.mongo.ObjectId(guild._id);

    if (!characterObjectId.equals(guild.leader))
      return res
        .status(400)
        .json({ message: "You cannot invite other players" });

    if (invitedCharacter.guild.invites.find((el) => guildObjectId.equals(el)))
      return res
        .status(400)
        .json({ message: "Player already invited" });

    if (guild.invites.find((el) => invitedCharacterObjectId.equals(el)))
      return res.status(400).json({ message: "Player already invited" });

    await Guild.updateOne(
      { _id: guild._id },
      {
        $push: { invites: invitedCharacter },
      }
    );

    await Character.updateOne(
      { _id: invitedCharacter._id },
      {
        $push: { "guild.invites": guild._id },
      }
    );

    res.status(200).json({ message: "Invite sent" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
