import mongoose, { Document } from "mongoose";

export interface ICharacter extends mongoose.Document {
  nickname: string;
  level: number;
  class: string;
  levelExperience: number;
  statistics: {
    strength: number;
    dexterity: number;
    condition: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };
  owner: mongoose.Types.ObjectId | IUser;
  equipment: mongoose.Types.Array<IEquipment["_id"]>;
}

export interface IUser extends Document {
  accountname: string;
  email: string;
  password: string;
  characters: mongoose.Types.Array<ICharacter["_id"]>;
}

export interface IItem extends mongoose.Document {
  name: string;
  type: string;
  minDamage?: number;
  maxDamage?: number;
  image: string;
  armor?: number;
  statistics: {
    strength?: number;
    condition?: number;
    dexterity?: number;
    wisdom?: number;
    intelligence?: number;
    charisma?: number;
  };
}

export interface IEquipment extends mongoose.Document {
  type: string;
  item: IItem | null;
}