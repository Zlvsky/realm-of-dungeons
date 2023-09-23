import initMerchants from "../../gameUtils/initValues/initMerchants";
import { Merchants } from "../../schemas/game/merchantsSchema";

async function insertMerchants() {
  try {
    const merchantsData = await initMerchants();

    const existingMerchants = await Merchants.find();

    if (existingMerchants.length === 0) {
      // if there is no data in Schema database simply insert it
      const options = { ordered: false };
      await Merchants.insertMany(merchantsData, options);
    } else {
      // otherwise update the existing documents with new data
      const updatedMerchants: string[] = [];
      for (const merchant of existingMerchants) {
        const newData = merchantsData.find(
          (newMerchant) => newMerchant.name === merchant.name
        );

        if (newData) {
          // if document exist overwrite it
          await Merchants.findOneAndUpdate({ name: newData.name }, newData);
        }
      }
      // add rest of merchants that don't exist
      const filteredItems = merchantsData.filter(
        (merchant) => !updatedMerchants.includes(merchant.name)
      );
      await Merchants.insertMany(filteredItems);
    }
    console.log("Merchants inserted successfully!");
  } catch (error: any) {
    console.error("Error inserting/updating merchants:", error);
  }
}

export default insertMerchants;
