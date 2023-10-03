import initItems from "../../gameUtils/initValues/initItems";
import { Item } from "../../schemas/game/itemSchema";

async function insertItems() {
  try {
    const itemsData = initItems();
    const existingItems = await Item.find();

    if (existingItems.length === 0) {
      // if there is no data in Schema database simply insert it
      const options = { ordered: false };
      await Item.insertMany(itemsData, options);
    } else {
      // otherwise update the existing documents with new data
      const updatedItemsId: number[] = [];
      for (const item of existingItems) {
        const newData = itemsData.find(
          (itemsData) => itemsData.itemId === item.itemId
        );

        if (newData) {
          // if document exist overwrite it
          updatedItemsId.push(newData.itemId);
          await Item.findOneAndUpdate({ itemId: newData.itemId }, newData);
        }
      }
      // add rest of items that don't exist
      const filteredItems = itemsData.filter(
        (item) => !updatedItemsId.includes(item.itemId)
      );
      await Item.insertMany(filteredItems);
    }
    return console.log("Items inserted successfully!");
  } catch (error: any) {
    return console.error("Error inserting/updating items:", error);
  }
}

export default insertItems;
