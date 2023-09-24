import mongoose from "mongoose";

const updatedValuesSchema = new mongoose.Schema({
  maxHealth: {
    type: Number,
    required: true,
    default: 100,
  },
  health: {
    type: Number,
    required: true,
    default: 100,
  },
  maxMana: {
    type: Number,
    required: true,
    default: 100,
  },
  mana: {
    type: Number,
    required: true,
    default: 100,
  },
  minDmg: {
    type: Number,
    required: true,
    default: 0.2,
  },
  maxDmg: {
    type: Number,
    required: true,
    default: 0.2,
  },
  armor: {
    type: Number,
    required: true,
    default: 0,
  },
  statistics: {
    melee: { type: Number, required: false },
    distance: { type: Number, required: false },
    magic: { type: Number, required: false },
    luck: { type: Number, required: false },
    resistance: { type: Number, required: false },
  },
});

export default updatedValuesSchema;
