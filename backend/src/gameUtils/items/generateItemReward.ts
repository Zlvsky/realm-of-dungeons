import { Item } from "../../schemas/game/itemSchema";

type ItemPool = {
    itemId: number;
    dropChance: number;
}[]

export const generateItemReward = async (itemPool: ItemPool) => {
    const randomDecimal = Math.random();
    const randomNumber = Math.round(randomDecimal * 100 * 100) / 100;
    
    const availableItemDrops = itemPool.filter((el) => el.dropChance >= randomNumber);
    const dropsLength = availableItemDrops.length;

    if (dropsLength === 0) return undefined;

    const randomItemNumber = Math.floor(Math.random() * (dropsLength + 1));

    const droppedItemId = availableItemDrops[randomItemNumber]?.itemId;

    if (!droppedItemId) return undefined;

    const item = await Item.findOne({ itemId: droppedItemId });

    if (!item) return undefined;

    return item;
}