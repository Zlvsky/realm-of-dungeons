import mongoose from "mongoose";
import { itemSchema } from "../../game/itemSchema";

const dungeonEnemySchema = new mongoose.Schema({
  name: { type: String, default: null },
  health: { type: Number, default: 100 },
  maxHealth: { type: Number, default: 100 },
  level: { type: Number, default: 1 },
  damage: { type: Number, default: 15 },
  attackText: { type: String, default: null },
  avatar: { type: String, default: null },
  description: { type: String, default: null },
  skills: {
    type: [
      {
        skillName: { type: String, default: null },
        damage: { type: Number, required: false, default: null },
        heal: { type: Number, required: false, default: null },
        cooldown: { type: Number, default: 3 },
        text: { type: String, default: null },
      },
    ],
    default: null,
  },
  rewards: {
    gold: { type: Number, default: null },
    xp: { type: Number, default: null },
    item: { type: itemSchema, default: null },
  },
});

const dungeonsSchema = new mongoose.Schema({
  realm: { type: String, default: "CAVERNS" },
  currentMonster: { type: Number, default: 0 },
  dungeonRenewDate: {
    type: String,
    default: null,
  },
  battle: {
    isBattleStarted: {
      type: Boolean,
      default: false,
    },
    battleWinner: { type: Number, enum: [1, 2], default: null },
    whosTurn: { type: Number, enum: [1, 2], default: 1 },
    textLogs: { type: [String], default: [] },
    enemy: {
      type: dungeonEnemySchema,
      default: null,
    },
  },
});

export default dungeonsSchema;
