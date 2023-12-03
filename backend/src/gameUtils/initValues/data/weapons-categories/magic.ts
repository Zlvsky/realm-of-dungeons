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
    {
      itemId: 2204,
      name: "Wand of Blaze",
      type: "weapon",
      subType: "wand",
      damage: 24,
      image: "/items/weapons/wands/2204.png",
      value: 30,
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
    {
      itemId: 2205,
      name: "Glacial Rod",
      type: "weapon",
      subType: "wand",
      damage: 28,
      image: "/items/weapons/wands/2205.png",
      value: 40,
      requiredLevel: 12,
      description: "Frost kissed energy"
    },
    {
      itemId: 2206,
      name: "Voodoo Rod",
      type: "weapon",
      subType: "wand",
      damage: 35,
      image: "/items/weapons/wands/2206.png",
      value: 80,
      requiredLevel: 18,
      description: "Sinister instrument of unholy energy"
    },
    {
      itemId: 2207,
      name: "Wand of Death",
      type: "weapon",
      subType: "wand",
      damage: 40,
      image: "/items/weapons/wands/2207.png",
      value: 80,
      requiredLevel: 25,
      description: "Conduit grim powers of underworld"
    },
  ],
};
