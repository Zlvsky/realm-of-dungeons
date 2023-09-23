export const jewellery = {
  necklace: {
    noMinLevel: [
      { name: "Silver Necklace", effect: "Increased Luck", weight: 0.5 },
      { name: "Amulet of Wisdom", effect: "Boosts Intelligence", weight: 0.6 },
      // Add more necklaces for no minimum level here
    ],
    minLevel10: [
      { name: "Golden Chain", effect: "Enhanced Strength", weight: 0.7 },
      // Add more necklaces for minimum level 10 here
    ],
    // Add more minimum level categories for necklaces as needed
  },
  ring: {
    noMinLevel: [
      { name: "Bronze Ring", effect: "Improved Defense", weight: 0.3 },
      { name: "Sapphire Ring", effect: "Water Magic Affinity", weight: 0.4 },
      // Add more rings for no minimum level here
    ],
    minLevel10: [
      { name: "Diamond Ring", effect: "Enhanced Magic Power", weight: 0.5 },
      // Add more rings for minimum level 10 here
    ],
    // Add more minimum level categories for rings as needed
  },
};
