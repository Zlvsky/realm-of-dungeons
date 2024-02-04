import { Request, Response } from "express";
import getUserIdFromToken from "../../../utils/getUserIdFromToken";
import { Guild } from "../../../schemas/game/guildSchema";
import mongoose from "mongoose";

export const getGuildsList = async (req: Request, res: Response) => {
  const { currentPage, characterId } = req.body;
  const page = Number(currentPage);

  try {
    const userId = getUserIdFromToken(req.headers.authorization);
    if (!userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const itemsPerPage = 14;

     const startIndex = (page - 1) * itemsPerPage;

     const totalCount = await Guild.countDocuments({});

     const totalPages = Math.ceil(totalCount / itemsPerPage);

     if (page > totalPages)
       return res.status(400).json({ message: "Page don't exist" });


    const guildsListQuery = await Guild.find({})
      .select("_id name leader members reputation requests description statistics")
      .sort({ reputation: -1, name: 1 })
      .skip(startIndex)
      .limit(itemsPerPage)
      .populate({
        path: "leader",
        select: "nickname",
      })
      .exec();

    const guildData = guildsListQuery.map((el) => {
      const { requests, ...guildData } = el.toObject();
      const characterObjectId = new mongoose.mongo.ObjectId(characterId);
      const requestedCharacter = requests.find((char) =>
        characterObjectId.equals(char)
      );
      if (requestedCharacter) return { ...guildData, requested: true };
      return {...guildData, requested: false };
    });

    const response = {
      totalItems: totalCount,
      itemsPerPage: itemsPerPage,
      currentPage: currentPage,
      items: guildData,
      totalPages: totalPages,
    };

    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
