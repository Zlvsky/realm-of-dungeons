import mongoose, { Schema, Model } from "mongoose";
import { IMerchant } from "../../types/account/MainInterfaces";
import { itemSchema } from "./itemSchema";

const merchantSchema: Schema<IMerchant> = new mongoose.Schema({
  name: { type: String, required: true },
  itemTypes: { type: [{ type: String }], required: true },
  randomItems: { type: Boolean, required: true },
  interestedIn: { type: [{ type: String }], required: true },
  staticItems: [
    {
      item: { type: itemSchema, default: null },
    },
  ],
});

export const Merchants: Model<IMerchant> = mongoose.model<IMerchant>(
  "Merchants",
  merchantSchema
);
