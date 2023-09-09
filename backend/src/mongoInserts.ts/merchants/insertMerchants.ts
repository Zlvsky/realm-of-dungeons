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
      for (const merchant of existingMerchants) {
        const newData = merchantsData.find(
          (newMerchant) => newMerchant.name === merchant.name
        );

        if (newData) {
          // if document exist overwrite it
          await Merchants.findOneAndUpdate({ name: newData.name }, newData);
        } else {
          // if document was not found insert it (for example new merchant)
          await Merchants.insertMany(newData);
        }
      }
    }
    console.log("Merchants inserted successfully!");
  } catch (error: any) {
    console.error("Error inserting/updating merchants:", error);
  }
}

export default insertMerchants;
