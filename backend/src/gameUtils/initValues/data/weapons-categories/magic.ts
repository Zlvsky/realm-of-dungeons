import { IWeaponObject } from "../weapons";

export const magicWeapons: IWeaponObject = {
  noMinLevel: [
    {
      itemId: 2201,
      name: "Apprentice Wand",
      type: "weapon",
      subType: "wand",
      damage: 15,
      image: "https://i.ibb.co/7SXJnbr/Apprentice-Wand.png",
      value: 2,
    },
    {
      itemId: 2202,
      name: "Wand of Storms",
      type: "weapon",
      subType: "wand",
      damage: 21,
      image: "https://i.ibb.co/B6kN34z/wand-of-storms.png",
      value: 8,
    },
  ],
  minLevel10: [
    {
      itemId: 2203,
      name: "Wand of Inferno",
      type: "weapon",
      subType: "wand",
      damage: 26,
      image: "https://i.ibb.co/YtszB5w/wand-of-inferno.png",
      value: 35,
      requiredLevel: 10,
    },
  ],
};
