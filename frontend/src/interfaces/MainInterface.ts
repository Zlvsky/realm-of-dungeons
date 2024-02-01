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

export type TCurrentRealm = "CAVERNS" | "CRYPT";

export interface ICharacter {
  _id: string;
  nickname: string;
  class: string;
  avatar: string;
  currentRealm: string;
  realms: {
    currentRealm: TCurrentRealm;
    availableRealms: TCurrentRealm[];
  };
  progression: {
    level: number;
    levelExperience: number;
    previousLevelExperience: number;
    experience: number;
    reputation: number;
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
        itemId?: string;
      };
    } | null;
    enemy: {
      name: string | null;
      health: number;
      attackText: string;
      maxHealth: number;
      level: number;
      damage: number;
      skills: ISkills[] | null;
      avatar: string | null;
    } | null;
    textLogs: string[];
  };
  availableQuests: IQuest[];
  dungeons: IDungeon[];
  statistics: IStatistics;
  owner: string;
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
  guild?: string | null;
  extras: {
    availableHeals: number;
    healRenewDate: string | null;
    stamina: number;
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
  characters: any;
}

export interface IItem {
  _id?: string;
  itemId: number;
  name: string;
  type: "armor" | "weapon" | "jewellery" | "potion";
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
    | "mana";
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

export interface IEquipment {
  type: string;
  item: IItem | null;
}

export interface IQuest {
  _id?: string;
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
  damage: number | null;
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
  dungeonRenewDate: string | null;
  battle: {
    isBattleStarted?: boolean;
    battleWinner?: 1 | 2 | null;
    whosTurn?: 1 | 2;
    textLogs: string[];
    enemy: {
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
    } | null;
  };
};