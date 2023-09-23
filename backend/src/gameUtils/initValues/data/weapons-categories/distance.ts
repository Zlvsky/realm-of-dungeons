import { IWeaponObject } from "../weapons";

export const distanceWeapons: IWeaponObject = {
  noMinLevel: [
    {
      itemId: 2101,
      name: "Bow",
      type: "weapon",
      subType: "bow",
      damage: 12,
      image: "https://i.ibb.co/cvJnKJx/bow.png",
      value: 0,
    },
    {
      itemId: 2102,
      name: "Finewood Bow",
      type: "weapon",
      subType: "bow",
      damage: 20,
      image: "https://i.ibb.co/HTSkbKj/finewood-bow.png",
      value: 10,
    },
  ],
  minLevel10: [
    {
      itemId: 2103,
      name: "Hunter Longbow",
      type: "weapon",
      subType: "bow",
      damage: 24,
      image: "https://i.ibb.co/Km6NwS0/hunter-longbow.png",
      value: 35,
      requiredLevel: 10,
    },
  ],
};