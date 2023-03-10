import { Request, Response } from "express";
import { IUserRegister } from "../../types/account/IUser";
import UserRegister from "../../schemas/account/registerSchema";

export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser: IUserRegister = new UserRegister({
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
