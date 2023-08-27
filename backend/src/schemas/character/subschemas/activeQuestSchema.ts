import mongoose, { Schema } from "mongoose";

const enemySchema = new mongoose.Schema({
  name: { type: String, default: null },
  health: { type: Number, default: 100 },
  maxHealth: { type: Number, default: 100 },
  level: { type: Number, default: 1 },
  damage: { type: Number, default: 15 },
  attackText: { type: String, default: null },
  skills: {
    type: [
      {
        skillName: { type: String, default: null },
        damage: { type: Number, default: null },
        cooldown: { type: Number, default: 3 },
        text: { type: String, default: null },
      },
    ],
    default: null,
  },
  avatar: { type: String, default: null },
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

const questSchema = new mongoose.Schema({
  title: { type: String, default: null },
  description: { type: String, default: null },
  duration: { type: Number, default: null },
  battleStarted: { type: Boolean, default: false },
  battleWinner: { type: Number, enum: [1, 2], default: null },
  whosTurn: { type: Number, enum: [1, 2], default: 1 },
  rewards: {
    gold: { type: Number, default: null },
    xp: { type: Number, default: null },
    itemId: { type: Schema.Types.ObjectId, ref: "Item", default: null },
  },
});

const activeQuestSchema = new mongoose.Schema({
  timeStarted: { type: String, default: null },
  quest: {
    type: questSchema,
    default: null,
  },
  enemy: {
    type: enemySchema,
    default: null,
  },
  textLogs: { type: [String], default: [] },
});

export default activeQuestSchema;
