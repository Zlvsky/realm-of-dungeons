import mongoose from "mongoose";

const QuestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  reward: {
    type: Number,
    required: true,
  },
  startTime: {
    type: Date,
    default: Date.now,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  characterOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Character",
    required: true,
  },
});

export const Quest = mongoose.model("Quest", QuestSchema);