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
      title: { type: String, default: "MEMBER", enum: ["MEMBER", "OFFICER", "LEADER"] },
      characterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Character",
      },
    },
  ],
});

export const Guild: Model<IGuild> = mongoose.model<IGuild>("Guild", guildSchema);
