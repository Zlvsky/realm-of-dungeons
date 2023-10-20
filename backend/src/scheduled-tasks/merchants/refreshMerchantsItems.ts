import generateMerchantItems from "../../gameUtils/merchants/generateMerchantItems";
import getItemsForMerchant from "../../gameUtils/merchants/getItemsForMerchant";
import getStaticItemsForMerchant from "../../gameUtils/merchants/getStaticItems";
import { Character } from "../../schemas/character/characterSchema";
import { Merchants } from "../../schemas/game/merchantsSchema";
import cron from "node-cron";

const getAllCharacters = async () => {
    try {
        const characters = await Character.find({});
        return characters;

    } catch (error) {
        console.error("Error with getting all characters: ", error);
    }
};

const getAllMerchants = async () => {
    try {
        const merchants = await Merchants.find({});
        return merchants;
    } catch (error) {
        console.error("Error with getting all merchants: ", error);
    }
}

const refreshMerchantsItems = async () => {
    const characters = await getAllCharacters();
    const merchants = await getAllMerchants();
    if (!characters || !merchants) return;
    for (const character of characters) {
        await generateMerchantItems(character);
        character.save();
    }
   
};

const scheduledRefreshMerchantItems = () => {
    cron.schedule("0 0 * * *", () => {
      console.log("performing merchant items refresh")
      refreshMerchantsItems();
    });
}

export default scheduledRefreshMerchantItems;