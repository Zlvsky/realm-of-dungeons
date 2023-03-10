import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  accountname: string;
  email: string;
  password: string;
}

const UserSchema = new mongoose.Schema({
  accountname: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export const User = mongoose.model<IUser>("User", UserSchema);
