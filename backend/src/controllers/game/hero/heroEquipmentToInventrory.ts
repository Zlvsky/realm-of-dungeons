import express, { Request, Response } from "express";
import mongoose from "mongoose";

import { Equipment } from "../../../schemas/game/equipmentSchema";
import { ICharacter, IEquipment } from "../../../types/account/MainInterfaces";
import { Character } from "../../../schemas/account/characterSchema";

// 2 cases - 1 if dragged from equipment to empty inventory slot
// 2- if dragged from equipment to occupied ivnentory slot
// if 1 case - set last equipment slot to empty and update ivnentory slot to that item
// if 2 case - if items are the same type switch them, in other case do nothing

export const updateEquipmentToInventory = async (req: Request, res: Response) => {
  const { characterId, itemId, slotIndex, itemType } = req.body;

  try {
    // checking if index have item inside
    const character: ICharacter | null = await Character.findOne({
      _id: characterId,
      "inventory.slotIndex": slotIndex,
    });
    if (!character) {
      return res.status(404).json({ message: "Inventory not found" });
    }
    const equipmentItem = character.equipment.find(
      (slot) => slot.type === itemType
    );

    const inventorySlot = character.inventory.find(
      (slot) => slot.slotIndex === slotIndex
    );

    if (!equipmentItem || !inventorySlot) {
      return res.status(404).json({ message: "Inventory slot not found" });
    }

    if (inventorySlot.item !== null && inventorySlot.item.type === itemType) {
      const equippedItem = itemId;
      const inventoryItem = inventorySlot.item;
      equippedItem.item = inventoryItem;
      inventorySlot.item = equippedItem;
    } else {
      equipmentItem.item = null;
      inventorySlot.item = itemId;
    }
    await character.save();
    res.json(character);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
