import { Merchants } from "../../schemas/game/merchantsSchema";
import { ICharacter } from "../../types/account/MainInterfaces";
import getItemsForMerchant from "./getItemsForMerchant";
import getStaticItemsForMerchant from "./getStaticItems";

const getAllMerchants = async () => {
  try {
    const merchants = await Merchants.find({});
    return merchants;
  } catch (error) {
    console.error("Error with getting all merchants: ", error);
  }
};

const generateMerchantItems = async (character: ICharacter) => {
  const merchants = await getAllMerchants();
  if (!character || !merchants) return;
  for (const merchant of merchants) {
    const merchantName = merchant.name;
    if (merchantName === "Weaponsmith") {
      const refreshedItems = await getItemsForMerchant(
        merchant,
        character.progression.level
      );
      character.merchantsItems.weaponsmith = refreshedItems;
    }
    if (merchantName === "Armourer") {
      const refreshedItems = await getItemsForMerchant(
        merchant,
        character.progression.level
      );
      character.merchantsItems.armourer = refreshedItems;
    }
    if (merchantName === "Witch") {
      const refreshedItems = await getItemsForMerchant(
        merchant,
        character.progression.level
      );
      character.merchantsItems.witch = refreshedItems;
    }
    if (merchantName === "Alchemist") {
      const refreshedItems = await getStaticItemsForMerchant(
        merchant,
        character.progression.level
      );
      character.merchantsItems.alchemist = refreshedItems;
    }
  }
};

export default generateMerchantItems;