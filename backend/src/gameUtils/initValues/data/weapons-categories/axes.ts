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
  ],
};
