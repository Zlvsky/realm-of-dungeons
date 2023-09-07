import { Request, Response } from "express";
import { Character } from "../../../schemas/character/characterSchema";

export const merchantBuyItem = async (req: Request, res: Response) => {
  const { characterId, merchantName, slotIndex } = req.body;
  try {
    const character = await Character.findById(characterId);
    
    if (!character)
      return res.status(404).json({ message: "Character not found" });

    const selectedMerchant: keyof typeof character.merchantsItems = merchantName;

    const merchant = character.merchantsItems[selectedMerchant];

    if (!merchant)
      return res.status(404).json({ message: "Merchant not found" });

    const merchantItem = merchant.find(el => el.slotIndex === slotIndex)?.item;

    if (!merchantItem)
      return res.status(404).json({ message: "Item not found" });
    
    if (!merchantItem.value || merchantItem.value > character.generalValues.gold) 
        return res.status(400).json({ message: "You don't have enough gold" });

    const emptyInventorySlot = character.inventory.find(
      (slot) => slot.item === null
    );

    if (!emptyInventorySlot)
        return res.status(400).json({ message: "You don't have empty slot in inventory" });

    emptyInventorySlot.item = merchantItem;
    character.generalValues.gold -= merchantItem.value;

    await character.save();
    return res.json("success");
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};
