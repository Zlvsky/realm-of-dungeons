import express, { Request, Response } from "express";
import mongoose from "mongoose";

import { Equipment } from "../../../schemas/game/equipmentSchema";
import { ICharacter, IEquipment } from "../../../types/account/MainInterfaces";
import { Character } from "../../../schemas/account/characterSchema";

export const updateInventory = async (req: Request, res: Response) => {
  const { characterId, itemId, slotIndex, lastIndex } = req.body;

  try {
    // checking if index have item inside
    const character: ICharacter | null = await Character.findOne({
      _id: characterId,
      "inventory.slotIndex": slotIndex,
    });
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
      const newItem = itemId;
      const lastItem = inventoryNextSlot.item;
      inventoryNextSlot.item = newItem;
      inventoryLastSlot.item = lastItem;
    } else {
      inventoryLastSlot.item = null;
      inventoryNextSlot.item = itemId;
    }
    await character.save();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
