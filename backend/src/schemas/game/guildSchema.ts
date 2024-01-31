import mongoose, { Schema, Model } from "mongoose";
import { IGuild } from "../../types/GuildInterface";

export const guildSchema: Schema<IGuild> = new mongoose.Schema({
  name: { type: String, required: true },
  leader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Character",
    required: true,
  },
  members: [
    {
      title: {
        type: String,
        default: "MEMBER",
        enum: ["MEMBER", "OFFICER", "LEADER"],
      },
      characterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Character",
      },
    },
  ],
  reputation: { type: Number, default: 0 },
  description: { type: String, default: "" },
  requests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Character",
    },
  ],
  invites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Character",
    },
  ],
  treasury: {
    gold: { type: Number, default: 0 },
  },
  statistics: {
    level: { type: Number, default: 1 },
    xpLevel: { type: Number, default: 1 },
    goldLevel: { type: Number, default: 1 },
  },
  chatLogs: [
    {
      sender: { type: String, required: true },
      message: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

export const Guild: Model<IGuild> = mongoose.model<IGuild>("Guild", guildSchema);
