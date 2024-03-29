import { IWeaponObject } from "../weapons";

export const swords: IWeaponObject = {
  noMinLevel: [
    {
      itemId: 2301,
      name: "Wooden Sword",
      type: "weapon",
      subType: "sword",
      damage: 10,
      critChance: 10,
      image: "https://i.ibb.co/GT9HqhH/wooden-sword.png",
      value: 2,
    },
    {
      itemId: 2302,
      name: "Steel Sword",
      type: "weapon",
      subType: "sword",
      damage: 18,
      critChance: 10,
      image: "https://i.ibb.co/176J4QD/steel-sword.png",
      value: 8,
    },
    {
      itemId: 2304,
      name: "Cavern Cutsword",
      type: "weapon",
      subType: "sword",
      damage: 20,
      critChance: 10,
      description: "Forged by ancient blacksmith",
      image: "/items/weapons/swords/2304.png",
      value: 20,
    },
  ],
  minLevel10: [
    {
      itemId: 2303,
      name: "Knight Sword",
      type: "weapon",
      subType: "sword",
      damage: 22,
      critChance: 12,
      image: "https://i.ibb.co/fx7N201/knight-sword.png",
      value: 30,
      requiredLevel: 10,
    },
    {
      itemId: 2305,
      name: "Obsidian Blade",
      type: "weapon",
      subType: "sword",
      damage: 25,
      critChance: 13,
      description: "Deadly relic from volcanic depths",
      image: "/items/weapons/swords/2305.png",
      value: 35,
      requiredLevel: 12,
    },
    {
      itemId: 2306,
      name: "Bonecarver Scimitar",
      type: "weapon",
      subType: "sword",
      damage: 28,
      critChance: 13,
      description: "Fashioned from the remnats of crypts",
      image: "/items/weapons/swords/2306.png",
      value: 50,
      requiredLevel: 15,
    },
    {
      itemId: 2307,
      name: "Skeletal Dagger",
      type: "weapon",
      subType: "sword",
      damage: 30,
      critChance: 14,
      description: "Forged by darkened bones of long-lost warriors",
      image: "/items/weapons/swords/2307.png",
      value: 70,
      requiredLevel: 18,
    },
  ],
};
