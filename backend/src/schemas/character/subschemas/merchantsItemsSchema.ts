import mongoose from "mongoose";
import {  itemSchema } from "../../game/itemSchema";

const merchantsItemsSchema = new mongoose.Schema({
  alchemist: [
    {
      slotIndex: { type: Number, required: true },
      item: { type: itemSchema, default: null },
    },
  ],
  treasurer: [
    {
      slotIndex: { type: Number, required: true },
      item: { type: itemSchema, default: null },
    },
  ],
  witch: [
    {
      slotIndex: { type: Number, required: true },
      item: { type: itemSchema, default: null },
    },
  ],
  armourer: [
    {
      slotIndex: { type: Number, required: true },
      item: { type: itemSchema, default: null },
    },
  ],
  weaponsmith: [
    {
      slotIndex: { type: Number, required: true },
      item: { type: itemSchema, default: null },
    },
  ],
});

export default merchantsItemsSchema;