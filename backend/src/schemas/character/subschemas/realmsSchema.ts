import mongoose from "mongoose";

const realmsSchema = new mongoose.Schema({
  currentRealm: {
    type: String,
    required: true,
    default: "CAVE",
  },
  availableRealms: {
    type: [String],
    required: true,
    default: ["CAVE"],
  },
});

export default realmsSchema;
