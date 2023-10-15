import mongoose from "mongoose";
import { itemSchema } from "../../game/itemSchema";

const availableQuestsSchema = new mongoose.Schema({
  realm: { type: String, default: "CAVERNS" },
  finishedQuests: { type: Number, default: 0 },
  quests: [
    {
      title: { type: String, default: null },
      description: { type: String, default: null },
      duration: { type: Number, default: null },
      battleStarted: { type: Boolean, default: false },
      rewards: {
        gold: { type: Number, default: null },
        xp: { type: Number, default: null },
        itemId: { type: itemSchema, default: null },
      },
    },
  ],
});

export default availableQuestsSchema;
