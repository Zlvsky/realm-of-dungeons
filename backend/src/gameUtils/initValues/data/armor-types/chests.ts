import { IArmorObject } from "../armors";
// 1300/1400 - chests armor

export const chests: IArmorObject = {
  cloth: {
    noMinLevel: [
      {
        itemId: 1301,
        name: "Old Coat",
        type: "armor",
        subType: "chest",
        armorType: "cloth",
        armor: 3,
        image: "https://i.ibb.co/bXwRr0H/Old-Coat.png",
        value: 5,
      },
    ],
    minLevel10: [
      {
        itemId: 1302,
        name: "Blue Robe",
        type: "armor",
        subType: "chest",
        armorType: "cloth",
        armor: 5,
        image: "https://i.ibb.co/ydXPcGw/Blue-Robe.png",
        statistics: {
          magic: 1,
        },
        requiredLevel: 10,
        value: 25,
      },
    ],
  },
  leather: {
    noMinLevel: [
      {
        itemId: 1303,
        name: "Leather Vest",
        type: "armor",
        subType: "chest",
        armorType: "leather",
        armor: 7,
        image: "https://i.ibb.co/9W42s2j/Leather-Vest.png",
        value: 15,
      },
    ],
    minLevel10: [
      {
        itemId: 1304,
        name: "Leather Armor",
        type: "armor",
        subType: "chest",
        armorType: "leather",
        armor: 9,
        image: "https://i.ibb.co/XV0htVd/Leather-Armor.png",
        requiredLevel: 10,
        value: 20,
      },
    ],
  },
  plate: {
    noMinLevel: [
      {
        itemId: 1305,
        name: "Chain Armor",
        type: "armor",
        subType: "chest",
        armorType: "plate",
        armor: 8,
        image: "https://i.ibb.co/xjrhsBm/Chain-Armor.png",
        value: 20,
      },
    ],
    minLevel10: [
      {
        itemId: 1306,
        name: "Iron Armor",
        type: "armor",
        subType: "chest",
        armorType: "plate",
        armor: 10,
        image: "https://i.ibb.co/Y2yHhDr/Iron-Armor.png",
        requiredLevel: 10,
        value: 35,
      },
    ],
  },
};
