import mongoose from "mongoose";
import getUserIdFromToken from "./getUserIdFromToken";

export const checkAuth = (compareId: mongoose.Types.ObjectId, jwt?: string, ) => {
if (!jwt) return false;

 const userId: any = getUserIdFromToken(jwt);

  if (userId === null) return false;

  const userIdObject = new mongoose.mongo.ObjectId(userId);

  if (!userIdObject || !userIdObject.equals(compareId)) {
    return false;
  }

  return true;
};