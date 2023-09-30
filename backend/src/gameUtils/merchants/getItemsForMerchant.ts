import { Item } from "../../schemas/game/itemSchema";
import { IItem, IMerchant } from "../../types/account/MainInterfaces";
import { armourerItems } from "./merchants-items/armourerItems";
import { weaponsmithItems } from "./merchants-items/weaponsmithItems";
import { witchItems } from "./merchants-items/witchItems";

const merchantItemsBasedOnLevel = (merchantName: string, heroLevel: number) => {
  let itemsData;
  if (merchantName === "Weaponsmith") itemsData = weaponsmithItems;
  if (merchantName === "Armourer") itemsData = armourerItems;
  if (merchantName === "Witch") itemsData = witchItems;
  const itemsInLevelRange = itemsData?.find(
    (el) => el.minLevel <= heroLevel && el.maxLevel > heroLevel
  );
  return itemsInLevelRange!.itemsId;
};

const getMerchantItems = async (merchantName: string, heroLevel: number, count: number) => {
  const merchantItemsId = merchantItemsBasedOnLevel(merchantName, heroLevel);
  try {
    const randomItems = await Item.aggregate([
      { $match: { itemId: { $in: merchantItemsId } } },
      { $sample: { size: count } },
    ]);

    return randomItems;
  } catch (error) {
    console.error(error);
    return [];
  }
};

// function adjustItemStats(baseItem: IItem, heroLevel: number) {
//   const adjustedItem = JSON.parse(JSON.stringify(baseItem));
//   const randomBaseValue = 0.1 + Math.random() * 0.4;
//   const randomStatValue = Math.floor(Math.random() * 4) + 2;
//   if (adjustedItem.armor) {
//     adjustedItem.armor = Math.round(
//       adjustedItem.armor + heroLevel * randomBaseValue
//     );
//   }
//   if (adjustedItem.damage) {
//     adjustedItem.minDamage = Math.round(
//       adjustedItem.minDamage + heroLevel * randomBaseValue
//     );
//     adjustedItem.maxDamage = Math.round(
//       adjustedItem.maxDamage + heroLevel * randomBaseValue
//     );
//   }
//   if (adjustedItem.statistics || Object.keys(adjustedItem).length > 0) {
//     for (const stat in adjustedItem.statistics) {
//       if (adjustedItem.statistics.hasOwnProperty(stat)) {
//         const baseValue = adjustedItem.statistics[stat];
//         const scaledValue = baseValue + heroLevel * randomStatValue;
//         adjustedItem.statistics[stat] = scaledValue;
//       }
//     }
//   }
//   return adjustedItem;
// }

const getRetrievedItems = (items: IItem[]) => {
    const retrievedItems = items.map((item, index) => {
      const dataToReturn = {
        item: item,
        slotIndex: index
      }
      return dataToReturn
    });
    return retrievedItems;
}

const getItemsForMerchant = async (merchant: IMerchant, heroLevel: number) => {
    const itemsCount = 6;
    const merchantItems = await getMerchantItems(
      merchant.name,
      heroLevel,
      itemsCount
    );
    if (merchantItems.length === 0) return [];
    return getRetrievedItems(merchantItems);
}

export default getItemsForMerchant;