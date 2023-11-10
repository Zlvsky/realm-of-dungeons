import mongoose, { Document, ObjectId } from "mongoose";

interface itemWithSlotIndex {
  slotIndex: number;
  item: IItem | null;
}

interface IStatistics {
  melee: number;
  distance: number;
  magic: number;
  luck: number;
  resistance: number;
}

interface IStatisticProgression {
  levelExperience: number;
  previousLevelExperience: number;
  experience: number;
}

export interface IEnemy {
  name: string | null;
  avatar: string | null;
  level: number;
  maxLevel: number;
  health: number;
  maxHealth: number;
  damage: number;
  attackText: string;
  skills: ISkills[] | null;
  isBoss?: boolean;
}

export type TCurrentRealm = "CAVERNS" | "CRYPT";

export interface ICharacter extends mongoose.Document {
  nickname: string;
  class: string;
  avatar: string;
  realms: {
    currentRealm: TCurrentRealm;
    availableRealms: TCurrentRealm[];
  };
  progression: {
    level: number;
    levelExperience: number;
    previousLevelExperience: number;
    experience: number;
    statistics: {
      melee: IStatisticProgression;
      distance: IStatisticProgression;
      magic: IStatisticProgression;
      resistance: IStatisticProgression;
    };
  };
  activeQuest: {
    timeStarted: string | null;
    quest: {
      title: string;
      description: string;
      duration: number;
      battleStarted: boolean;
      battleWinner: 1 | 2 | null;
      whosTurn: 1 | 2;
      rewards: {
        gold: number;
        xp: number;
        item?: IItem;
      };
    } | null;
    enemy: IEnemy | null;
    isBoss: boolean;
    textLogs: string[];
  };
  availableQuests: {
    realm: TCurrentRealm;
    finishedQuests: number;
    quests: IQuest[];
  }[];
  dungeons: IDungeon[],
  statistics: IStatistics;
  owner: mongoose.Types.ObjectId | IUser;
  equipment: [
    {
      type: string;
      item: IItem | null;
    }
  ];
  inventory: [itemWithSlotIndex];
  generalValues: {
    gold: number;
    basicHealth: number;
    basicMana: number;
    basicDefense: number;
  };
  updatedValues: {
    maxHealth: number;
    health: number;
    maxMana: number;
    mana: number;
    minDmg: number;
    maxDmg: number;
    armor: number;
    statistics: IStatistics;
  };
  extras: {
    availableHeals: number;
    healRenewDate: string | null;
  };
  merchantsItems: {
    alchemist: itemWithSlotIndex[];
    treasurer: itemWithSlotIndex[];
    witch: itemWithSlotIndex[];
    armourer: itemWithSlotIndex[];
    weaponsmith: itemWithSlotIndex[];
  };
}

export interface IUser extends Document {
  accountname: string;
  email: string;
  password: string;
  isAdmin?: boolean;
  characters: mongoose.Types.Array<ICharacter["_id"]>;
}

export interface IItemObject {
  itemId: number;
  name: string;
  type: "armor" | "weapon" | "jewellery" | "potion" | "realm orb";
  subType:
    | "head"
    | "chest"
    | "legs"
    | "sword"
    | "axe"
    | "mace"
    | "bow"
    | "crossbow"
    | "wand"
    | "necklace"
    | "ring"
    | "health"
    | "mana"
    | "quest";
  armorType?: "cloth" | "leather" | "plate";
  damage?: number;
  armor?: number;
  image: string;
  requiredLevel?: number;
  statistics?: {
    melee?: number;
    distance?: number;
    magic?: number;
    luck?: number;
    resistance?: number;
    health?: number;
    mana?: number;
  };
  description?: string;
  value?: number;
}

export interface IItem extends IItemObject, mongoose.Document {};

export interface IEquipment extends mongoose.Document {
  type: string;
  item: IItem | null;
}

export interface IQuest {
  _id?: ObjectId;
  title: string;
  description: string;
  duration?: number;
  battleStarted: boolean;
  battleWinner?: 1 | 2 | null;
  whosTurn?: 1 | 2;
  rewards: {
    gold: number;
    xp: number;
    item?: IItem;
  };
}

export interface ISkills {
  skillName: string | null;
  damage?: number | null;
  heal?: number | null;
  cooldown: number;
  text: string | null;
}

export interface IMerchant {
  name: string;
  itemTypes: string[];
  randomItems: boolean;
  interestedIn: string[];
  staticItems: { item: IItem | null }[];
}

export interface IDungeon {
  realm: string;
  currentMonster: number;
  isBattleStarted?: boolean;
  battleWinner?: 1 | 2 | null;
  whosTurn?: 1 | 2;
  dungeonRenewDate: string | null;
  enemies: {
    name: string;
    health: number;
    maxHealth: number;
    level: number;
    damage: number;
    attackText: string;
    avatar: string;
    description: string;
    skills: ISkills[] | null;
    rewards: {
      gold: number;
      xp: number;
      item?: IItem;
    };
  }[];
}