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
  damage: {
    type: Number,
    required: true,
    default: 10,
  },
  defense: {
    type: Number,
    required: true,
    default: 0,
  },
  statistics: {
    axe: { type: Number, required: false },
    sword: { type: Number, required: false },
    mace: { type: Number, required: false },
    distance: { type: Number, required: false },
    magic: { type: Number, required: false },
  },
});

export default updatedValuesSchema;
