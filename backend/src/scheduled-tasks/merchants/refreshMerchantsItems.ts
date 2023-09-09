import getItemsForMerchant from "../../gameUtils/merchants/getRandomItems";
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
        for (const merchant of merchants) {
            const merchantName = merchant.name;
            if (merchantName === "Weaponsmith") {
              const refreshedItems = await getItemsForMerchant(merchant, character.progression.level);
              character.merchantsItems.weaponsmith = refreshedItems;
            }
            if (merchantName === "Armourer") {
              const refreshedItems = await getItemsForMerchant(merchant, character.progression.level);
              character.merchantsItems.armourer = refreshedItems;
            }
            if (merchantName === "Witch") {
              const refreshedItems = await getItemsForMerchant(merchant, character.progression.level);
              character.merchantsItems.witch = refreshedItems;
            }
            if (merchantName === "Alchemist") {
              const refreshedItems = await getStaticItemsForMerchant(merchant, character.progression.level);
              character.merchantsItems.alchemist = refreshedItems;
            }
        }
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