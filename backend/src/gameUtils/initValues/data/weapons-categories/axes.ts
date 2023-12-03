import { IWeaponObject } from "../weapons";

export const axes: IWeaponObject = {
  noMinLevel: [
    {
      itemId: 2401,
      name: "Weak Axe",
      type: "weapon",
      subType: "axe",
      damage: 10,
      image: "https://i.ibb.co/xML1x5J/weak-axe.png",
      value: 2,
    },
    {
      itemId: 2402,
      name: "Steel Axe",
      type: "weapon",
      subType: "axe",
      damage: 19,
      image: "https://i.ibb.co/kqD6s6k/steel-axe.png",
      value: 10,
    },
  ],
  minLevel10: [
    {
      itemId: 2403,
      name: "Knight Axe",
      type: "weapon",
      subType: "axe",
      damage: 23,
      image: "https://i.ibb.co/B26w0cQ/knight-axe.png",
      value: 35,
      requiredLevel: 10,
    },
    {
      itemId: 2404,
      name: "Crimson Axe",
      type: "weapon",
      subType: "axe",
      damage: 32,
      description: "Scarlet brilliance in its wake",
      image: "/items/weapons/swords/2404.png",
      value: 35,
      requiredLevel: 20,
    },
    {
      itemId: 2405,
      name: "Plague Cleaver",
      type: "weapon",
      subType: "axe",
      damage: 35,
      description: "Brings infinite suffering",
      image: "/items/weapons/swords/2405.png",
      value: 60,
      requiredLevel: 25,
    },
  ],
};
