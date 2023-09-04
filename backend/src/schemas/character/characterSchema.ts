import mongoose, { Schema, Model } from "mongoose";
import { ICharacter, IQuest } from "../../types/account/MainInterfaces";
import progressionSchema from "./subschemas/progressionSchema";
import availableQuestsSchema from "./subschemas/availableQuestsSchema";
import activeQuestSchema from "./subschemas/activeQuestSchema";
import generalValuesSchema from "./subschemas/generalValuesSchema";
import statisticsSchema from "./subschemas/statisticsSchema";
import merchantsItemsSchema from "./subschemas/merchantsItemsSchema";
import updatedValuesSchema from "./subschemas/updatedValuesSchema";

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
  },
  avatar: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    required: true,
  },
  progression: progressionSchema,
  availableQuests: [availableQuestsSchema],
  activeQuest: activeQuestSchema,
  equipment: [
    {
      type: { type: String, required: true },
      item: { type: Schema.Types.ObjectId, ref: "Item", default: null },
    },
  ],
  inventory: [
    {
      slotIndex: { type: Number, required: true },
      item: { type: Schema.Types.ObjectId, ref: "Item", default: null },
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
  },
});

export const Character = mongoose.model<ICharacter>(
  "Character",
  CharacterSchema
);