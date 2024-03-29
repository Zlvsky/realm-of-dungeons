import { Request, Response } from "express";
import { Character } from "../../../schemas/character/characterSchema";
import getUserIdFromToken from "../../../utils/getUserIdFromToken";

export const getRanking = async (req: Request, res: Response) => {
    const { currentPage } = req.params;
    const page = Number(currentPage);

    try {
        const userId = getUserIdFromToken(req.headers.authorization);
        if (!userId) {
          return res.status(403).json({ message: "Unauthorized" });
        }

        const itemsPerPage = 24;

        const startIndex = (page - 1) * itemsPerPage;
 
        const totalCount = await Character.countDocuments({});

        const totalPages = Math.ceil(totalCount / itemsPerPage);

        if (page > totalPages)
          return res.status(400).json({ message: "Page don't exist" });

        const rankingHeroes = await Character.find({})
          .select("_id nickname progression.level progression.reputation")
          .sort({ "progression.level": -1, "nickname": 1 })
          .skip(startIndex)
          .limit(itemsPerPage)
          .exec();


        const response = {
          totalItems: totalCount,
          itemsPerPage: itemsPerPage,
          currentPage: currentPage,
          items: rankingHeroes,
          totalPages: totalPages,
        };
        res.json(response);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
}