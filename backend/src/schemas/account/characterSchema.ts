import mongoose, { Schema, Model } from "mongoose";
import { ICharacter } from "../../types/account/MainInterfaces";

// to be added: INVENTORY, SKILLS, GUILD, FRIENDS

const CharacterSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  nickname: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    required: true,
  },
  progression: {
    level: {
      type: Number,
      required: true,
      default: 1,
    },
    levelExperience: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  activeQuest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quest",
    default: null,
  },
  equipment: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Equipment",
    },
  ],
  heroValues: {
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
    mana: {
      type: Number,
      required: true,
      default: 100,
    },
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

export const Character = mongoose.model<ICharacter>(
  "Character",
  CharacterSchema
);