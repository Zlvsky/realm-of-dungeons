import mongoose, { Schema } from "mongoose";

const merchantsItemsSchema = new mongoose.Schema({
  alchemist: [
    {
      slotIndex: { type: Number, required: true },
      item: { type: Schema.Types.ObjectId, ref: "Item", default: null },
    },
  ],
  treasurer: [
    {
      slotIndex: { type: Number, required: true },
      item: { type: Schema.Types.ObjectId, ref: "Item", default: null },
    },
  ],
  witch: [
    {
      slotIndex: { type: Number, required: true },
      item: { type: Schema.Types.ObjectId, ref: "Item", default: null },
    },
  ],
  armourer: [
    {
      slotIndex: { type: Number, required: true },
      item: { type: Schema.Types.ObjectId, ref: "Item", default: null },
    },
  ],
  weaponsmith: [
    {
      slotIndex: { type: Number, required: true },
      item: { type: Schema.Types.ObjectId, ref: "Item", default: null },
    },
  ],
});

export default merchantsItemsSchema;