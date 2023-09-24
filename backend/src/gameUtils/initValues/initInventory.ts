import getStarterWeapons from "../characters/getStarterWeapons";

const length = 15;

const initInventory = (heroClass: "warrior" | "mage" | "archer" ) => {
  const starterWeapons = getStarterWeapons(heroClass);
  const starterWeaponsArrayLength = starterWeapons ? starterWeapons.length : 0;
  
  const inventorySlots = [...Array(length)].map((_, i) => {
    if (i < starterWeaponsArrayLength && starterWeapons) return { slotIndex: i, item: starterWeapons[i] };
    return { slotIndex: i, item: null };
  });
  return inventorySlots;
}

export default initInventory;
