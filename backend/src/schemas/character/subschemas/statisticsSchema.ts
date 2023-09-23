import mongoose from "mongoose";

const statisticsSchema = new mongoose.Schema({
  axe: { type: Number, required: false },
  sword: { type: Number, required: false },
  mace: { type: Number, required: false },
  distance: { type: Number, required: false },
  magic: { type: Number, required: false },
});


export default statisticsSchema;