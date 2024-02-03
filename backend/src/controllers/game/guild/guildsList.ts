import { Request, Response } from "express";
import getUserIdFromToken from "../../../utils/getUserIdFromToken";
import { Guild } from "../../../schemas/game/guildSchema";

export const getGuildsList = async (req: Request, res: Response) => {
  const { currentPage } = req.params;
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
      .select("_id name leader members reputation statistics")
      .sort({ reputation: -1, name: 1 })
      .skip(startIndex)
      .limit(itemsPerPage)
      .populate({
        path: "leader",
        select: "nickname",
      })
      .exec();

    const response = {
      totalItems: totalCount,
      itemsPerPage: itemsPerPage,
      currentPage: currentPage,
      items: guildsListQuery,
      totalPages: totalPages,
    };

    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
