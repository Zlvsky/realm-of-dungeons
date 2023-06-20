import mongoose, { Schema, Model } from "mongoose";
import { ICharacter, IQuest } from "../../types/account/MainInterfaces";

// to be added: INVENTORY, SKILLS, GUILD, FRIENDS

const CharacterSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  nickname: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    required: true,
  },
  progression: {
    level: {
      type: Number,
      required: true,
      default: 1,
    },
    experience: {
      type: Number,
      required: true,
      default: 0,
    },
    levelExperience: {
      type: Number,
      required: true,
      default: 0,
    },
    previousLevelExperience: {
      type: Number,
      required: true,
      defaut: 0,
    },
    availableStatPoints: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  availableQuests: [
    {
      title: { type: String, default: null },
      description: { type: String, default: null },
      duration: { type: Number, default: null },
      battleStarted: { type: Boolean, default: false },
      rewards: {
        gold: { type: Number, default: null },
        xp: { type: Number, default: null },
        itemId: { type: Schema.Types.ObjectId, ref: "Item", default: null },
      },
    },
  ],
  activeQuest: {
    timeStarted: { type: String, default: null },
    quest: {
      type: {
        title: { type: String, default: null },
        description: { type: String, default: null },
        duration: { type: Number, default: null },
        battleStarted: { type: Boolean, default: false },
        rewards: {
          gold: { type: Number, default: null },
          xp: { type: Number, default: null },
          itemId: { type: Schema.Types.ObjectId, ref: "Item", default: null },
        },
      },
      default: null,
    },
    enemy: {
      type: {
        name: { type: String, default: null },
        health: { type: Number, default: 100 },
        level: { type: Number, default: 1 },
        damage: { type: Number, default: 15 },
        skills: {
          type: [
            {
              skillName: { type: String, default: null },
              damage: { type: Number, default: null },
              cooldown: { type: Number, default: 3 },
              text: { type: String, default: null },
            },
          ],
          default: null,
        },
        avatar: { type: String, default: null },
        statistics: {
          strength: {
            type: Number,
            required: true,
          },
          dexterity: {
            type: Number,
            required: true,
          },
          condition: {
            type: Number,
            required: true,
          },
          intelligence: {
            type: Number,
            required: true,
          },
          wisdom: {
            type: Number,
            required: true,
          },
          charisma: {
            type: Number,
            required: true,
          },
        },
      },
      default: null,
    },
  },
  equipment: [
    {
      type: { type: String, required: true },
      item: { type: Schema.Types.ObjectId, ref: "Item", default: null },
    },
  ],
  inventory: [
    {
      slotIndex: { type: Number, required: true },
      item: { type: Schema.Types.ObjectId, ref: "Item", default: null },
    },
  ],
  heroValues: {
    gold: {
      type: Number,
      required: true,
      default: 0,
    },
    health: {
      type: Number,
      required: true,
      default: 100,
    },
    mana: {
      type: Number,
      required: true,
      default: 100,
    },
    armor: {
      type: Number,
      required: true,
      default: 0,
    },
    damage: {
      type: Number,
      required: true,
      default: 10,
    },
  },
  statistics: {
    strength: {
      type: Number,
      required: true,
    },
    dexterity: {
      type: Number,
      required: true,
    },
    condition: {
      type: Number,
      required: true,
    },
    intelligence: {
      type: Number,
      required: true,
    },
    wisdom: {
      type: Number,
      required: true,
    },
    charisma: {
      type: Number,
      required: true,
    },
  },
});

export const Character = mongoose.model<ICharacter>(
  "Character",
  CharacterSchema
);