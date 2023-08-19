import { Request, Response } from "express";
import User from "../../schemas/account/userSchema";
import getUserIdFromToken from "../../utils/getUserIdFromToken";

export const getUserDetails = async (req: Request, res: Response) => {
  try {
    const userId = getUserIdFromToken(req.headers.authorization);
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};
