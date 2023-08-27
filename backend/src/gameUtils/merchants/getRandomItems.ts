import { Item } from "../../schemas/game/itemSchema";
import { IItem, IMerchant } from "../../types/account/MainInterfaces";

const getRandomItemsByType = async (types: string[], count: number) => {
  try {
    const randomItems = await Item.aggregate([
      { $match: { type: { $in: types } } },
      { $sample: { size: count } },
    ]);

    return randomItems;
  } catch (error) {
    console.error(error);
    return [];
  }
};

function adjustItemStats(baseItem: IItem, heroLevel: number) {
  const adjustedItem = JSON.parse(JSON.stringify(baseItem));
  const randomBaseValue = 0.1 + Math.random() * 0.4;
  const randomStatValue = Math.floor(Math.random() * 4) + 2;
  if (adjustedItem.armor) {
    adjustedItem.armor = Math.round(
      adjustedItem.armor + heroLevel * randomBaseValue
    );
  }
  if (adjustedItem.minDamage && adjustedItem.maxDamage) {
    adjustedItem.minDamage = Math.round(
      adjustedItem.minDamage + heroLevel * randomBaseValue
    );
    adjustedItem.maxDamage = Math.round(
      adjustedItem.maxDamage + heroLevel * randomBaseValue
    );
  }
  if (adjustedItem.statistics || Object.keys(adjustedItem).length > 0) {
    for (const stat in adjustedItem.statistics) {
      if (adjustedItem.statistics.hasOwnProperty(stat)) {
        const baseValue = adjustedItem.statistics[stat];
        const scaledValue = baseValue + heroLevel * randomStatValue;
        adjustedItem.statistics[stat] = scaledValue;
      }
    }
  }
  return adjustedItem;
}

const getScaledItems = (items: IItem[], heroLevel: number) => {
    const scaledItems = items.map((item) => adjustItemStats(item, heroLevel));
    return scaledItems;
}

const getItemsForMerchant = async (merchant: IMerchant, heroLevel: number) => {
    const randomItems = await getRandomItemsByType(merchant.itemTypes, 8);
    if (randomItems.length === 0) return [];
    console.log("a", getScaledItems(randomItems, heroLevel))
    return getScaledItems(randomItems, heroLevel);
}

export default getItemsForMerchant;