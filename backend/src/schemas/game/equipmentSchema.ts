import mongoose, { mongo } from 'mongoose';
import { IEquipment } from '../../types/account/MainInterfaces';

const equipmentSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item",
    required: false,
  },
  character: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Character',
    required: true,
  },
});

export const Equipment = mongoose.model<IEquipment>("Equipment", equipmentSchema);