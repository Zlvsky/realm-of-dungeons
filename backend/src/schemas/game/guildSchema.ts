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
  chatLogs: [
    {
      sender: { type: String, required: true },
      message: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

export const Guild: Model<IGuild> = mongoose.model<IGuild>("Guild", guildSchema);
