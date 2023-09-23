import { IWeaponObject } from "../weapons";

export const maces: IWeaponObject = {
  noMinLevel: [
    {
      itemId: 2501,
      name: "Stone Club",
      type: "weapon",
      subType: "mace",
      damage: 10,
      image: "https://i.ibb.co/DRnbR0g/stone-club.png",
      value: 0,
    },
    {
      itemId: 2502,
      name: "Stone Hammer",
      type: "weapon",
      subType: "mace",
      damage: 18,
      image: "https://i.ibb.co/4T8xDhG/stone-hammer.png",
      value: 8,
    },
  ],
  minLevel10: [
    {
      itemId: 2503,
      name: "Mace",
      type: "weapon",
      subType: "mace",
      damage: 22,
      image: "https://i.ibb.co/x8HT0L0/mace.png",
      value: 30,
      requiredLevel: 10,
    },
  ],
};
