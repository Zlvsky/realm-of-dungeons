import mongoose from "mongoose";

export interface IGuild {
  name: string;
  leader: mongoose.Types.ObjectId;
  members: {
    title: "MEMBER" | "OFFICER" | "LEADER";
    characterId: mongoose.Types.ObjectId;
  }[];
  reputation: number;
  description: string;
  requests: mongoose.Types.ObjectId[];
  invites: mongoose.Types.ObjectId[];
  treasury: {
    gold: number;
  };
  statistics: {
    level: number;
    xpLevel: number;
    goldLevel: number;
  };
  chatLogs: {
    sender: string;
    message: string;
    timeStamp: Date;
  }[];
}