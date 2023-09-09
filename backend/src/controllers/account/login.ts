import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../schemas/account/userSchema";

export const loginUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ accountname: req.body.accountname });

    if (!user) {
      return res.status(404).send("User not found");
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
      return res.status(401).send("Invalid credentials");
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!);
    
    if (user.isAdmin) return res.status(200).json({ token, isAdmin: user.isAdmin });
    return res.status(200).json({ token });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};
