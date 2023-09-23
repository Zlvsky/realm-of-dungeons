export const potions = {
  health: {
    noMinLevel: [
      { name: "Minor Health Potion", healing: 20, weight: 0.2 },
      { name: "Healing Elixir", healing: 40, weight: 0.4 },
      // Add more health potions for no minimum level here
    ],
    minLevel10: [
      { name: "Greater Health Potion", healing: 60, weight: 0.6 },
      // Add more health potions for minimum level 10 here
    ],
    // Add more minimum level categories for health potions as needed
  },
  mana: {
    noMinLevel: [
      { name: "Minor Mana Potion", restoration: 20, weight: 0.2 },
      { name: "Mana Elixir", restoration: 40, weight: 0.4 },
      // Add more mana potions for no minimum level here
    ],
    minLevel10: [
      { name: "Greater Mana Potion", restoration: 60, weight: 0.6 },
      // Add more mana potions for minimum level 10 here
    ],
    // Add more minimum level categories for mana potions as needed
  },
};
