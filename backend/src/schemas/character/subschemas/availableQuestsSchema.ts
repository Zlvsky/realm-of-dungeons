import mongoose, { Schema } from "mongoose";

const availableQuestsSchema = new mongoose.Schema({
  title: { type: String, default: null },
  description: { type: String, default: null },
  duration: { type: Number, default: null },
  battleStarted: { type: Boolean, default: false },
  rewards: {
    gold: { type: Number, default: null },
    xp: { type: Number, default: null },
    itemId: { type: Schema.Types.ObjectId, ref: "Item", default: null },
  },
});

export default availableQuestsSchema;
