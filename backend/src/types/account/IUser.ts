import { Document } from "mongoose";

export interface IUserRegister extends Document {
  accountname: string;
  email: string;
  password: string;
}
