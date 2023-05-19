import express, { Request, Response } from "express";
import mongoose from "mongoose";

import { Equipment } from "../../../schemas/game/equipmentSchema";
import { ICharacter, IEquipment } from "../../../types/account/MainInterfaces";
import { Character } from "../../../schemas/account/characterSchema";

export const updateInventory = async (req: Request, res: Response) => {
  const { characterId, itemId, slotIndex, lastIndex } = req.body;

  try {
    // checking if index have item inside
    const characterNextSlot: ICharacter | null = await Character.findOne(
      { _id: characterId, "inventory.slotIndex": slotIndex },
    )
    const characterLastSlot: ICharacter | null = await Character.findOne(
      { _id: characterId, "inventory.slotIndex": lastIndex },
    )
    if (!characterNextSlot || !characterLastSlot) {
      return res.status(404).json({ message: "Inventory not found" });
    }

    const inventorySlot = characterNextSlot.inventory[slotIndex];

    if(inventorySlot.item !== null) {
      characterNextSlot.updateOne({
        $set: {
          "inventory.$.item": itemId,
        },
      });
      characterLastSlot.updateOne({
        $set: {
          "inventory.$.item": inventorySlot.item,
        },
      });
    } else {
      if (lastIndex !== null || lastIndex !== undefined) {
        characterLastSlot.updateOne({
          $set: {
            "inventory.$.item": null,
          },
        });
      }
      // add next slot item 
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
