import mongoose, { Schema, Model } from "mongoose";
import { IItem } from "../../types/account/MainInterfaces";

const itemSchema: Schema<IItem> = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  minDamage: { type: Number, required: false },
  maxDamage: { type: Number, required: false },
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
});

export const Item: Model<IItem> = mongoose.model<IItem>("Item", itemSchema);
