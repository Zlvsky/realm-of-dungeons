import mongoose from "mongoose";

const realmsSchema = new mongoose.Schema({
  currentRealm: {
    type: String,
    required: true,
    default: "CAVERNS",
  },
  availableRealms: {
    type: [String],
    required: true,
    default: ["CAVERNS"],
  },
});

export default realmsSchema;
