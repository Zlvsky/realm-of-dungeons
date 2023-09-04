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
  armor: {
    type: Number,
    required: true,
    default: 0,
  },
  statistics: {
    strength: {
      type: Number,
      required: true,
    },
    dexterity: {
      type: Number,
      required: true,
    },
    condition: {
      type: Number,
      required: true,
    },
    intelligence: {
      type: Number,
      required: true,
    },
    wisdom: {
      type: Number,
      required: true,
    },
    charisma: {
      type: Number,
      required: true,
    },
  },
});

export default updatedValuesSchema;
