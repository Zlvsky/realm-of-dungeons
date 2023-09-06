import { Request, Response } from "express";

import { ICharacter } from "../../../types/account/MainInterfaces";
import { Character } from "../../../schemas/character/characterSchema";

export const updateInventory = async (req: Request, res: Response) => {
  const { characterId, item, slotIndex, lastIndex } = req.body;

  try {
    // checking if index have item inside
    const character: ICharacter | null = await Character.findById(characterId);
      
    if (!character) {
      return res.status(404).json({ message: "Inventory not found" });
    }
    const inventoryLastSlot = character.inventory.find(
      (slot) => slot.slotIndex === lastIndex
    );

    const inventoryNextSlot = character.inventory.find(
      (slot) => slot.slotIndex === slotIndex
    );

    if (!inventoryNextSlot || !inventoryLastSlot) {
      return res.status(404).json({ message: "Inventory slot not found" });
    }

    if (inventoryNextSlot.item !== null) {
      const newItem = item;
      const lastItem = inventoryNextSlot.item;
      inventoryNextSlot.item = newItem;
      inventoryLastSlot.item = lastItem;
    } else {
      inventoryLastSlot.item = null;
      inventoryNextSlot.item = item;
    }
    await character.save();
    res.json(character);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
