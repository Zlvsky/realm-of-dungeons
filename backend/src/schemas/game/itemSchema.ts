import mongoose, { Schema, Model } from "mongoose";
import { IItem } from "../../types/account/MainInterfaces";

export const itemSchema: Schema<IItem> = new mongoose.Schema({
  itemId: { type: Number, required: true },
  name: { type: String, required: true },
  type: {
    type: String,
    required: true,
    enum: ["armor", "weapon", "jewellery", "potion", "realm orb"],
  },
  subType: {
    type: String,
    required: true,
    enum: [
      "head",
      "chest",
      "legs",
      "sword",
      "axe",
      "mace",
      "bow",
      "crossbow",
      "wand",
      "necklace",
      "ring",
      "health",
      "mana",
      "quest"
    ],
  },
  armorType: {
    type: String,
    required: false,
    enum: ["cloth", "leather", "plate"],
  },
  image: { type: String, required: true },
  requiredLevel: { type: Number, required: false },
  damage: { type: Number, required: false },
  armor: { type: Number, required: false },
  statistics: {
    melee: { type: Number, required: false },
    distance: { type: Number, required: false },
    magic: { type: Number, required: false },
    luck: { type: Number, required: false },
    resistance: { type: Number, required: false },
    health: { type: Number, required: false },
    mana: { type: Number, required: false },
  },
  description: { type: String, required: false },
  value: { type: Number, required: false },
});

export const Item: Model<IItem> = mongoose.model<IItem>("Item", itemSchema);
