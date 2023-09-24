import mongoose from "mongoose";

const statisticsSchema = new mongoose.Schema({
  melee: { type: Number, required: false },
  distance: { type: Number, required: false },
  magic: { type: Number, required: false },
  luck: { type: Number, required: false },
  resistance: { type: Number, required: false },
});


export default statisticsSchema;