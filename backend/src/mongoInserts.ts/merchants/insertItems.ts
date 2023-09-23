import initItems from "../../gameUtils/initValues/initItems";
import { Item } from "../../schemas/game/itemSchema";


async function insertItems() {
  try {
    const itemsData = await initItems();

    const existingItems = await Item.find();

    if (existingItems.length === 0) {
      // if there is no data in Schema database simply insert it
      const options = { ordered: false };
      await Item.insertMany(itemsData, options);
    } else {
      // otherwise update the existing documents with new data
      for (const item of existingItems) {
        const newData = itemsData.find(
          (itemsData) => itemsData.name === item.name
        );

        if (newData) {
          // if document exist overwrite it
          await Item.findOneAndUpdate({ name: newData.name }, newData);
        } else {
          // if document was not found insert it (for example new merchant)
          await Item.insertMany(newData);
        }
      }
    }
    console.log("Items inserted successfully!");
  } catch (error: any) {
    console.error("Error inserting/updating items:", error);
  }
}

export default insertItems;
