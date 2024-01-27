import mongoose from "mongoose";

export interface IGuild {
  name: string;
  leader: mongoose.Types.ObjectId;
  members: {
    title: "MEMBER" | "OFFICER" | "LEADER";
    characterId: mongoose.Types.ObjectId;
  };
  reputation: number;
  description: string;
  chatLogs: {
    sender: string;
    message: string;
    timeStamp: Date;
  }[];
}