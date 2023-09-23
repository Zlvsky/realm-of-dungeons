const armors = {
  head: {
    cloth: {
      noMinLevel: [
        { name: "Cloth Hat", defense: 5, weight: 1 },
        { name: "Wizard's Hood", defense: 8, weight: 2 },
        // Add more cloth head armor for no minimum level here
      ],
      minLevel10: [
        { name: "Enchanted Headwrap", defense: 12, weight: 3 },
        // Add more cloth head armor for minimum level 10 here
      ],
      // Add more minimum level categories for cloth head armor as needed
    },
    leather: {
      noMinLevel: [
        { name: "Leather Cap", defense: 10, weight: 3 },
        { name: "Rogue's Hood", defense: 15, weight: 4 },
        // Add more leather head armor for no minimum level here
      ],
      minLevel10: [
        { name: "Sturdy Leather Helm", defense: 20, weight: 5 },
        // Add more leather head armor for minimum level 10 here
      ],
      // Add more minimum level categories for leather head armor as needed
    },
    plate: {
      noMinLevel: [
        { name: "Steel Helm", defense: 15, weight: 6 },
        { name: "Knight's Helmet", defense: 20, weight: 8 },
        // Add more plate head armor for no minimum level here
      ],
      minLevel10: [
        { name: "Reinforced Plate Helmet", defense: 25, weight: 9 },
        // Add more plate head armor for minimum level 10 here
      ],
      // Add more minimum level categories for plate head armor as needed
    },
  },
  chest: {
    // Repeat the same structure for chest armor (cloth, leather, plate)
  },
  legs: {
    // Repeat the same structure for leg armor (cloth, leather, plate)
  },
};
