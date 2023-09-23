import mongoose from "mongoose";

const generalValuesSchema = new mongoose.Schema({
  gold: {
    type: Number,
    required: true,
    default: 0,
  },
  basicHealth: {
    type: Number,
    required: true,
    default: 100,
  },
  basicMana: {
    type: Number,
    required: true,
    default: 100,
  },
  basicDefense: {
    type: Number,
    required: true,
    default: 0,
  },
});

export default generalValuesSchema;
