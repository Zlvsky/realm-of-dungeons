import insertMerchants from "./merchants/insertMerchants";
import insertItems from "./merchants/insertItems";

async function initInsert() {
    await insertItems();
    await insertMerchants()
}

export default initInsert;