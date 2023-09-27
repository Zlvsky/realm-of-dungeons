import { Request, Response } from "express";
import { Character } from "../../../schemas/character/characterSchema";
import { Merchants } from "../../../schemas/game/merchantsSchema";

const getSellValue = (value: number, isInterested: boolean) => {
    if (isInterested) return Math.round(value * 0.75);
    return Math.round(value * 0.4);
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

    const isMerchantInterested = merchant.interestedIn.includes(inventoryItem.item.type);

    inventoryItem.item = null;
    character.generalValues.gold += getSellValue(itemValue, isMerchantInterested);

    await character.save();
    return res.json("success");
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};
