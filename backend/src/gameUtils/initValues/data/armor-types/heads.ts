import { IArmorObject } from "../armors";
// 1100/1200 - heads armor

export const heads: IArmorObject = {
  cloth: {
    noMinLevel: [
      {
        itemId: 1101,
        name: "Mystic Turban",
        type: "armor",
        subType: "head",
        armorType: "cloth",
        armor: 2,
        image: "https://i.ibb.co/HnVpxJW/Mystic-Turban.png",
        statistics: {
          mana: 30,
          magic: 1,
        },
        value: 10,
      },
    ],
    minLevel10: [
      {
        itemId: 1102,
        name: "Witch Hat",
        type: "armor",
        subType: "head",
        armorType: "cloth",
        armor: 4,
        image: "https://i.ibb.co/Mf4gg7J/Witch-Hat.png",
        statistics: {
          mana: 60,
          magic: 2,
        },
        value: 30,
      },
    ],
  },
  leather: {
    noMinLevel: [
      {
        itemId: 1103,
        name: "Leather Cap",
        type: "armor",
        subType: "head",
        armorType: "leather",
        armor: 4,
        image: "https://i.ibb.co/QFdGtXL/Leather-Cap.png",
        value: 5,
      },
    ],
    minLevel10: [
      {
        itemId: 1104,
        name: "Old Hood",
        type: "armor",
        subType: "head",
        armorType: "leather",
        armor: 6,
        image: "https://i.ibb.co/94bfry6/Old-Hood.png",
        statistics: {
          distance: 1,
        },
        value: 30,
      },
    ],
  },
  plate: {
    noMinLevel: [
      {
        itemId: 1105,
        name: "Iron Helmet",
        type: "armor",
        subType: "head",
        armorType: "plate",
        armor: 6,
        image: "https://i.ibb.co/fpwWTJ5/iron-helmet.png",
        value: 15,
      },
    ],
    minLevel10: [
      {
        itemId: 1106,
        name: "Steel Helmet",
        type: "armor",
        subType: "head",
        armorType: "plate",
        armor: 7,
        image: "https://i.ibb.co/6YYcCVx/Steel-Helmet.png",
        value: 30,
      },
    ],
  },
};