import initMerchants from "../../gameUtils/initValues/initMerchants";
import { Merchants } from "../../schemas/game/merchantsSchema";

async function insertMerchants() {
  try {
    const options = { ordered: false }; // Ignore duplicates
    await Merchants.insertMany(initMerchants, options);
    console.log("Merchants inserted successfully!");
  } catch (error: any) {
    if (error.code !== 11000) {
      console.error("Error creating example items:", error);
    }
  }
}

export default insertMerchants;