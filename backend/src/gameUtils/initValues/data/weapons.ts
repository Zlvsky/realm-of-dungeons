export const weapons = {
  melee: {
    noMinLevel: [
      { name: "Melee Weapon 1", damage: 10, weight: 5 },
      { name: "Melee Weapon 2", damage: 15, weight: 7 },
      // Add more melee weapons for no minimum level here
    ],
    minLevel10: [
      { name: "Strong Melee Weapon", damage: 20, weight: 10 },
      // Add more melee weapons for minimum level 10 here
    ],
    // Add more minimum level categories for melee weapons as needed
  },
  distance: {
    noMinLevel: [
      { name: "Bow", damage: 12, range: 50 },
      { name: "Crossbow", damage: 18, range: 40 },
      // Add more distance weapons for no minimum level here
    ],
    minLevel10: [
      { name: "Sniper Rifle", damage: 30, range: 100 },
      // Add more distance weapons for minimum level 10 here
    ],
    // Add more minimum level categories for distance weapons as needed
  },
  magic: {
    noMinLevel: [
      { name: "Magic Staff", spellPower: 25, manaCost: 10 },
      { name: "Wand", spellPower: 15, manaCost: 5 },
      // Add more magic weapons for no minimum level here
    ],
    minLevel10: [
      { name: "Master Wand", spellPower: 40, manaCost: 15 },
      // Add more magic weapons for minimum level 10 here
    ],
    // Add more minimum level categories for magic weapons as needed
  },
};