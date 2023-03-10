import mongoose, { Schema, Model } from "mongoose";
import bcrypt from "bcrypt";

import { IUserRegister } from "../../types/account/IUser";

const RegisterSchema: Schema = new mongoose.Schema({
  accountname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

RegisterSchema.pre<IUserRegister>("save", function (next) {
  const user = this;
  bcrypt.hash(
    user.password,
    10,
    function (err: mongoose.CallbackError | undefined, hash: string) {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    }
  );
});

const UserRegister: Model<IUserRegister> = mongoose.model<IUserRegister>(
  "UserRegister",
  RegisterSchema
);

export default UserRegister;