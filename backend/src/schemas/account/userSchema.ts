import mongoose, { Schema, Model } from "mongoose";
import bcrypt from "bcrypt";

import { IUser } from "../../types/account/MainInterfaces";

const UserSchema: Schema = new mongoose.Schema({
  accountname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: false},
  characters: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Character",
    },
  ],
});

UserSchema.pre<IUser>("save", function (next) {
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

const User: Model<IUser> = mongoose.model<IUser>("user", UserSchema);

export default User;