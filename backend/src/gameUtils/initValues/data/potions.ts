// 10-20 HEALTH POTIONS
// 30-40 MANA POTIONS

const potionsData = {
  health: {
    noMinLevel: [
      {
        itemId: 10,
        name: "Small Health Potion",
        type: "potion",
        subType: "health",
        image: "https://i.ibb.co/zHv3g7L/small-Health-Potion.png",
        description: "Recovers small amount of health",
        value: 5,
      },
    ],
    minLevel10: [
      {
        itemId: 11,
        name: "Strong Health Potion",
        type: "potion",
        subType: "health",
        image: "https://i.ibb.co/Tg3Kcwq/strong-Health-Potion.png",
        description: "Recovers moderate amount of health",
        value: 15,
      },
    ],
  },
  mana: {},
};

export const potions = [
  ...potionsData.health.noMinLevel,
  ...potionsData.health.minLevel10,
]
