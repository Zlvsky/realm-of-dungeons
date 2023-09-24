import { IArmorObject } from "../armors";
// 1500/1600 - legs armor

export const legs: IArmorObject = {
  cloth: {
    noMinLevel: [
      {
        itemId: 1501,
        name: "Cloth Pants",
        type: "armor",
        subType: "legs",
        armorType: "cloth",
        armor: 2,
        image: "https://i.ibb.co/vDx5Xwx/Cloth-Pants.png",
        value: 5,
      },
    ],
    minLevel10: [
      {
        itemId: 1502,
        name: "Aladin Pants",
        type: "armor",
        subType: "legs",
        armorType: "cloth",
        armor: 4,
        image: "https://i.ibb.co/K7RVzSW/Aladin-Pants.png",
        statistics: {
          magic: 1,
        },
        value: 20,
      },
    ],
  },
  leather: {
    noMinLevel: [
      {
        itemId: 1503,
        name: "Leather Legs",
        type: "armor",
        subType: "legs",
        armorType: "leather",
        armor: 4,
        image: "https://i.ibb.co/wp6VXYk/Leather-Legs.png",
        value: 10,
      },
    ],
    minLevel10: [
      {
        itemId: 1504,
        name: "Leather Leggings",
        type: "armor",
        subType: "legs",
        armorType: "leather",
        armor: 7,
        image: "https://i.ibb.co/dmDL8p6/Leather-Leggings.png",
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
        itemId: 1505,
        name: "Chain Legs",
        type: "armor",
        subType: "legs",
        armorType: "plate",
        armor: 6,
        image: "https://i.ibb.co/jhKZxfw/Chain-Legs.png",
        value: 15,
      },
    ],
    minLevel10: [
      {
        itemId: 1506,
        name: "Iron Legs",
        type: "armor",
        subType: "legs",
        armorType: "plate",
        armor: 9,
        image: "https://i.ibb.co/Z60XHLr/Iron-Legs.png",
        value: 30,
      },
    ],
  },
};
