import { Request, Response } from "express";
import { IUser } from "../../types/account/MainInterfaces";
import User from "../../schemas/account/userSchema";

const validateUser = (body: any) => {
  const emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  const nameFormat = /^\d*[a-zA-Z][a-zA-Z\d]*$/;
  if (!body.email || body.email === "" || !body.email.match(emailFormat))
    return { message: "Invalid email" };

  if (
    !body.accountname ||
    body.accountname.length < 3 ||
    !body.accountname.match(nameFormat)
  )
    return { message: "Invalid account name" };

  if (!body.password || body.password.length < 8)
    return { message: "Invalid password" };

  return false;
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, accountname, password } = req.body;
    const user = await User.findOne({
      $or: [{ email: email }, { accountname: accountname }],
    });

    if (user) return res.status(400).json({ message: "User already exists" });

    const userError = validateUser(req.body);

    if (userError) return res.status(400).json(userError);

    const newUser: IUser = new User({
      accountname: accountname,
      email: email,
      password: password,
    });

    await newUser.save();
    res.status(200).send("User saved to database");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "External error" });
  }
};
