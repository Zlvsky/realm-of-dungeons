import express, { Request, Response } from "express";
import mongoose from "mongoose";

import { Equipment } from "../../../schemas/game/equipmentSchema";
import { ICharacter, IEquipment } from "../../../types/account/MainInterfaces";
import { Character } from "../../../schemas/account/characterSchema";

export const updateInventory = async (req: Request, res: Response) => {
  const { characterId, itemId, slotIndex, lastIndex } = req.body;

  try {
    if(lastIndex) {
      const resetLastSlot: ICharacter | null = await Character.findOneAndUpdate(
        { _id: characterId, "inventory.slotIndex": lastIndex },
        {
          $set: {
            "inventory.$.item": null,
          },
        }
      );
      if (!resetLastSlot) {
        return res.status(404).json({ message: "Inventory not found" });
      }
    } 
    
    const character: ICharacter | null = await Character.findOneAndUpdate(
      { _id: characterId, "inventory.slotIndex": slotIndex },
      {
        $set: {
          "inventory.$.item": itemId,
        },
      }
    );

    if (!character) {
      console.log(character);
      return res.status(404).json({ message: "Inventory not found" });
    }

    res.json(character);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
