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
    default: 0,
  },
  statistics: {
    melee: {
      experience: {
        type: Number,
        default: 0,
      },
      levelExperience: {
        type: Number,
        default: 0,
      },
      previousLevelExperience: {
        type: Number,
        default: 0,
      },
    },
    distance: {
      experience: {
        type: Number,
        default: 0,
      },
      levelExperience: {
        type: Number,
        default: 0,
      },
      previousLevelExperience: {
        type: Number,
        default: 0,
      },
    },
    magic: {
      experience: {
        type: Number,
        default: 0,
      },
      levelExperience: {
        type: Number,
        default: 0,
      },
      previousLevelExperience: {
        type: Number,
        default: 0,
      },
    },
    resistance: {
      experience: {
        type: Number,
        default: 0,
      },
      levelExperience: {
        type: Number,
        default: 0,
      },
      previousLevelExperience: {
        type: Number,
        default: 0,
      },
    },
  },
});

export default progressionSchema;