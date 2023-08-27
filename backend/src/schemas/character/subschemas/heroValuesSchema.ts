import mongoose from "mongoose";

const heroValuesSchema = new mongoose.Schema({
  gold: {
    type: Number,
    required: true,
    default: 0,
  },
  health: {
    type: Number,
    required: true,
    default: 100,
  },
  currentHealth: {
    type: Number,
    required: true,
    default: 100,
  },
  mana: {
    type: Number,
    required: true,
    default: 100,
  },
  currentMana: {
    type: Number,
    required: true,
    default: 100,
  },
  armor: {
    type: Number,
    required: true,
    default: 0,
  },
  damage: {
    type: Number,
    required: true,
    default: 10,
  },
});

export default heroValuesSchema;
