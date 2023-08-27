import mongoose from "mongoose";

const progressionSchema = new mongoose.Schema({
  level: {
    type: Number,
    required: true,
    default: 1,
  },
  experience: {
    type: Number,
    required: true,
    default: 0,
  },
  levelExperience: {
    type: Number,
    required: true,
    default: 0,
  },
  previousLevelExperience: {
    type: Number,
    required: true,
    defaut: 0,
  },
  availableStatPoints: {
    type: Number,
    required: true,
    default: 0,
  },
});

export default progressionSchema;