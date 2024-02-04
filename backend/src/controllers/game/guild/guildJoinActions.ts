import { Request, Response } from "express";
import { Character } from "../../../schemas/character/characterSchema";
import getUserIdFromToken from "../../../utils/getUserIdFromToken";
import { checkAuth } from "../../../utils/checkAuth";
import { Guild } from "../../../schemas/game/guildSchema";
import mongoose from "mongoose";

export const requestJoinGuild = async (req: Request, res: Response) => {
  const { characterId, guildId } = req.body;

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

    const characterObjectId = new mongoose.mongo.ObjectId(character._id);

    if (character.guild.memberOf)
      return res.status(400).json({ message: "You are already in guild" });

    const guild = await Guild.findById(guildId);

    if (!guild) {
      return res.status(400).json({ message: "Guild not found" });
    }

    if (
      guild.members.find((el: any) => characterObjectId.equals(el.characterId))
    )
      return res.status(400).json({ message: "You are already in that guild" });

    if (guild.requests.find((el: any) => characterObjectId.equals(el)))
      return res.status(400).json({ message: "You already requested to join" });

    guild.requests.push(character._id);

    guild.save();

    res.status(200).json({ message: "Request sent" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

export const joinGuild = async (req: Request, res: Response) => {
  const { characterId, guildId } = req.body;

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

    const characterObjectId = new mongoose.mongo.ObjectId(character._id);

    if (character.guild.memberOf)
      return res.status(400).json({ message: "You are already in guild" });

    const guild = await Guild.findById(guildId);

    if (!guild) {
      return res.status(400).json({ message: "Guild not found" });
    }

    if (
      guild.members.find((el: any) => characterObjectId.equals(el.characterId))
    )
      return res.status(400).json({ message: "You are already in that guild" });

    if (!guild.invites.find((el: any) => characterObjectId.equals(el)))
      return res.status(400).json({ message: "Your invitation expired" });

    if (guild.members.length === 5 + (guild.statistics.level - 1))
      return res.status(400).json({ message: "Guild is full" });

    const newMember = {
      title: "MEMBER",
      characterId: character._id,
    };

    await Guild.updateOne(
      { _id: guildId },
      {
        $push: { members: newMember },
        $pull: { invites: character._id },
      }
    );

    const guildObjectId = new mongoose.mongo.ObjectId(guild._id);

    const characterInvites = character.guild.invites.filter(
      (el) => !guildObjectId.equals(el)
    );

    character.guild.memberOf = guild._id;
    character.guild.invites = characterInvites;

    character.save();

    res.status(200).json({ message: "Joined guild" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

export const declineGuildInvite = async (req: Request, res: Response) => {
  const { characterId, guildId } = req.body;

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

    const characterObjectId = new mongoose.mongo.ObjectId(character._id);

    const guild = await Guild.findById(guildId);

    if (!guild) {
      return res.status(400).json({ message: "Guild not found" });
    }

    if (
      guild.members.find((el: any) => characterObjectId.equals(el.characterId))
    )
      return res.status(400).json({ message: "You are already in that guild" });

    if (guild.invites.find((el: any) => characterObjectId.equals(el))) {
      await Guild.updateOne(
        { _id: guildId },
        {
          $pull: { invites: character._id },
        }
      );
    }

    const guildObjectId = new mongoose.mongo.ObjectId(guild._id);

    const characterInvites = character.guild.invites.filter(
      (el) => !guildObjectId.equals(el)
    );

    character.guild.invites = characterInvites;

    character.save();

    res.status(200).json({ message: "Declined invite" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
