import { Request, Response } from "express";
import User from "../../schemas/account/userSchema";

export const getUserData = async (req: any, res: Response) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};
