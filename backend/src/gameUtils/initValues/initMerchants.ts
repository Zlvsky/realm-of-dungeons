import { IMerchant } from "../../types/account/MainInterfaces";

const initMerchants: IMerchant[] = [
  {
    name: "Alchemist",
    itemTypes: ["potion", "herbs"],
    randomItems: false,
    interestedIn: ["potion", "herbs"],
    staticItems: [],
  },
  {
    name: "Treasurer",
    itemTypes: [],
    randomItems: false,
    interestedIn: ["loot"],
    staticItems: [],
  },
  {
    name: "Witch",
    itemTypes: ["staff", "wand", "spellbook"],
    randomItems: true,
    interestedIn: ["staff", "wand", "spellbook"],
    staticItems: [],
  },
  {
    name: "Armourer",
    itemTypes: ["cloth armor", "leather armor", "plate armor"],
    randomItems: true,
    interestedIn: ["cloth armor", "leather armor", "plate armor"],
    staticItems: [],
  },
  {
    name: "Weaponsmith",
    itemTypes: ["sword", "axe", "bow", "crossbow", "shield"],
    randomItems: true,
    interestedIn: ["sword", "axe", "bow", "crossbow", "shield"],
    staticItems: [],
  },
];

export default initMerchants;
