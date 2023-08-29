import getItemsForMerchant from "../../gameUtils/merchants/getRandomItems";
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
        for (const merchant of merchants) {
            if (merchant.name === "Weaponsmith" && character.nickname === "dsd") {
              const refreshedItems = await getItemsForMerchant(merchant, character.progression.level);
              character.merchantsItems.weaponsmith = refreshedItems;
            }
        }
        character.save();
    }
   
};

const scheduledRefreshMerchantItems = () => {
    cron.schedule("* * * * *", () => {
      refreshMerchantsItems();
    });
}

export default scheduledRefreshMerchantItems;