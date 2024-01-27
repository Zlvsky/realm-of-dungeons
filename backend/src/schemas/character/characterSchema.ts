import mongoose from "mongoose";
import { ICharacter } from "../../types/account/MainInterfaces";
import progressionSchema from "./subschemas/progressionSchema";
import availableQuestsSchema from "./subschemas/availableQuestsSchema";
import activeQuestSchema from "./subschemas/activeQuestSchema";
import generalValuesSchema from "./subschemas/generalValuesSchema";
import statisticsSchema from "./subschemas/statisticsSchema";
import merchantsItemsSchema from "./subschemas/merchantsItemsSchema";
import updatedValuesSchema from "./subschemas/updatedValuesSchema";
import { itemSchema } from "../game/itemSchema";
import realmsSchema from "./subschemas/realmsSchema";
import dungeonsSchema from "./subschemas/dungeonsSchema";

// to be added: SKILLS, GUILD, FRIENDS

const CharacterSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  nickname: {
    type: String,
    required: true,
    unique: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    required: true,
  },
  guild: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Guild",
    default: null,
  },
  realms: realmsSchema,
  progression: progressionSchema,
  availableQuests: [availableQuestsSchema],
  activeQuest: activeQuestSchema,
  dungeons: [dungeonsSchema],
  equipment: [
    {
      type: { type: String, required: true },
      item: { type: itemSchema, default: null },
    },
  ],
  inventory: [
    {
      slotIndex: { type: Number, required: true },
      item: { type: itemSchema, default: null },
    },
  ],
  generalValues: generalValuesSchema,
  updatedValues: updatedValuesSchema,
  statistics: statisticsSchema,
  merchantsItems: merchantsItemsSchema,
  extras: {
    availableHeals: {
      type: Number,
      enum: [0, 1, 2],
      default: 2,
    },
    healRenewDate: {
      type: String,
      default: null,
    },
    stamina: {
      type: Number,
      default: 120,
    },
  },
});

export const Character = mongoose.model<ICharacter>(
  "Character",
  CharacterSchema
);