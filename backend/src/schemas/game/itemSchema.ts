import mongoose, { Schema, Model } from "mongoose";
import { IItem } from "../../types/account/MainInterfaces";

export const itemSchema: Schema<IItem> = new mongoose.Schema({
  itemId: { type: Number, required: true},
  name: { type: String, required: true },
  type: { type: String, required: true, enum: ["armor", "weapon", "jewellery", "potion"] },
  subType: { type: String, required: false, enum: ["head", "chest", "legs", "sword", "axe", "mace", "bow", "crossbow", "wand", "necklace", "ring", "health", "mana"] },
  armorType: { type: String, required: false, enum: ["cloth", "leather", "plate"] },
  damage: { type: Number, required: false },
  image: { type: String, required: true },
  armor: { type: Number, required: false },
  statistics: {
    strength: { type: Number, required: false },
    condition: { type: Number, required: false },
    dexterity: { type: Number, required: false },
    wisdom: { type: Number, required: false },
    intelligence: { type: Number, required: false },
    charisma: { type: Number, required: false },
  },
  description: { type: String, required: false },
  value: { type: Number, required: false },
});

export const Item: Model<IItem> = mongoose.model<IItem>("Item", itemSchema);
