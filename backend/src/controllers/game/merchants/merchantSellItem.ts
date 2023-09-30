import { Request, Response } from "express";
import { Character } from "../../../schemas/character/characterSchema";
import { Merchants } from "../../../schemas/game/merchantsSchema";
import { IItem, IMerchant } from "../../../types/account/MainInterfaces";

const getSellValue = (value: number, isInterested: boolean) => {
    if (isInterested) return Math.round(value * 0.6);
    return Math.round(value * 0.3);
}

const isMerchantInterested = (item: IItem, merchant: IMerchant) => {
  const itemType = item.type;
  const itemSubType = item.subType;
  const itemArmorType = item?.armorType;
  const typesToCheck = [itemType, itemSubType, itemArmorType];
  return merchant.interestedIn.some((item: any) => typesToCheck.includes(item));
}

export const merchantSellItem = async (req: Request, res: Response) => {
  const { characterId, merchantName, inventorySlot } = req.body;
  try {
    const character = await Character.findById(characterId);
    const merchant = await Merchants.findOne({ name: merchantName });

    if (!character)
      return res.status(404).json({ message: "Character not found" });
  
    if (!merchant)
      return res.status(404).json({ message: "Merchant not found" });

    const inventoryItem = character.inventory.find(
      (el) => el.slotIndex === inventorySlot
    );

    if (!inventoryItem?.item)
      return res.status(404).json({ message: "Item not found" });

    const itemValue = inventoryItem.item.value;
      
    if (itemValue === undefined || itemValue === null)
      return res.status(404).json({ message: "You can't sell that item" });

    const isInterested = isMerchantInterested(inventoryItem.item, merchant);

    inventoryItem.item = null;
    character.generalValues.gold += getSellValue(itemValue, isInterested);

    await character.save();
    return res.json("success");
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};
