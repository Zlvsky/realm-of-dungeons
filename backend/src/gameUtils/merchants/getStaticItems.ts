import { IItem, IMerchant } from "../../types/account/MainInterfaces";

function adjustStaticItem(baseItem: IItem | null, heroLevel: number) {
    if (!baseItem) return null;
     const item = JSON.parse(JSON.stringify(baseItem));
     const randomPriceValue = 0.5 + Math.random() * heroLevel;
     const newPrice = item.value * randomPriceValue;
     item.value = Math.round(newPrice * 20) / 20;
     return item;
}

const getScaledItems = (staticItems: {item: IItem | null}[], heroLevel: number) => {
    const scaledItems = staticItems.map((staticItem, index) => {
      const dataToReturn = {
        item: adjustStaticItem(staticItem.item, heroLevel),
        slotIndex: index,
      };
      return dataToReturn;
    });
    return scaledItems;
}

const getStaticItemsForMerchant = async (merchant: IMerchant, heroLevel: number) => {
  const staticItems = merchant.staticItems;
  if (staticItems.length === 0) return [];
  return getScaledItems(staticItems, heroLevel);
};

export default getStaticItemsForMerchant;
