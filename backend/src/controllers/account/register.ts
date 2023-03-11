import { Request, Response } from "express";
import { IUser } from "../../types/account/MainInterfaces";
import User from "../../schemas/account/userSchema";

export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser: IUser = new User({
      accountname: req.body.accountname,
      email: req.body.email,
      password: req.body.password,
    });

    await newUser.save();
    res.status(200).send("User saved to database");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error saving user to database");
  }
};
