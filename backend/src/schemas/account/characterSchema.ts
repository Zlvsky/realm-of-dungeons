import mongoose, { Schema, Model } from "mongoose";
import { ICharacter } from "../../types/account/MainInterfaces";

const CharacterSchema = new mongoose.Schema({
  nickname: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    required: true,
    default: 1,
  },
  class: {
    type: String,
    required: true,
  },
  levelExperience: {
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
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  equipment: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Equipment",
    },
  ],
});

export const Character = mongoose.model<ICharacter>(
  "Character",
  CharacterSchema
);