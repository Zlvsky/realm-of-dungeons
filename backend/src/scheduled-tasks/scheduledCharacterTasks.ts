import generateMerchantItems from "../gameUtils/merchants/generateMerchantItems";
import getItemsForMerchant from "../gameUtils/merchants/getItemsForMerchant";
import getStaticItemsForMerchant from "../gameUtils/merchants/getStaticItems";
import { Character } from "../schemas/character/characterSchema";
import { Merchants } from "../schemas/game/merchantsSchema";
import cron from "node-cron";

const getAllCharacters = async () => {
    try {
        const characters = await Character.find({});
        return characters;

    } catch (error) {
        console.error("Error with getting all characters: ", error);
    }
};

export const getAllMerchants = async () => {
    try {
        const merchants = await Merchants.find({});
        return merchants;
    } catch (error) {
        console.error("Error with getting all merchants: ", error);
    }
}

const characterScheduledTasks = async () => {
    const characters = await getAllCharacters();
    const merchants = await getAllMerchants();
    if (!characters || !merchants) return;
    for (const character of characters) {
        // REFRESH ITEMS IN MERCHANTS
        const { _id } = character;
        const merchantItems = await generateMerchantItems(character, merchants);

        const updateFields = {
          [`merchantsItems.alchemist`]: merchantItems.alchemist,
          [`merchantsItems.weaponsmith`]: merchantItems.weaponsmith,
          [`merchantsItems.armourer`]: merchantItems.armourer,
          [`merchantsItems.witch`]: merchantItems.witch,
          [`extras.stamina`]: 120,
        };

        await Character.findOneAndUpdate(
          { _id: _id },
          { $set: updateFields },
          { runValidators: false}
        );
    }
   
};

const scheduledCharacterTasks = () => {
    cron.schedule("0 0 * * *", () => {
    // cron.schedule("* * * * *", () => {
      console.log("performing merchant items refresh")
      characterScheduledTasks();
    });
}

export default scheduledCharacterTasks;