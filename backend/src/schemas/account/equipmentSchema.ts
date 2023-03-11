import mongoose from 'mongoose';
import { IEquipment } from '../../types/account/MainInterfaces';

const EquipmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  character: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Character',
    required: true,
  },
});

export const Equipment = mongoose.model<IEquipment>('Equipment',EquipmentSchema);