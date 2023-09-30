import { IWeaponObject } from "../weapons";

export const swords: IWeaponObject = {
  noMinLevel: [
    {
      itemId: 2301,
      name: "Wooden Sword",
      type: "weapon",
      subType: "sword",
      damage: 10,
      image: "https://i.ibb.co/GT9HqhH/wooden-sword.png",
      value: 2,
    },
    {
      itemId: 2302,
      name: "Steel Sword",
      type: "weapon",
      subType: "sword",
      damage: 18,
      image: "https://i.ibb.co/176J4QD/steel-sword.png",
      value: 8,
    },
  ],
  minLevel10: [
    {
      itemId: 2303,
      name: "Knight Sword",
      type: "weapon",
      subType: "sword",
      damage: 22,
      image: "https://i.ibb.co/fx7N201/knight-sword.png",
      value: 30,
      requiredLevel: 10,
    },
  ],
};
