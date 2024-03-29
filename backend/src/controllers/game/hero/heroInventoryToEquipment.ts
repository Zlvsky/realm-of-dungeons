import { Request, Response } from "express";

import { ICharacter } from "../../../types/account/MainInterfaces";
import { Character } from "../../../schemas/character/characterSchema";
import getUpdatedValues from "../../../gameUtils/characters/getUpdatedValues";
import getValuesWithStatistics from "../../../gameUtils/characters/getValuesWithStatistics";
import { checkAuth } from "../../../utils/checkAuth";

// 2 cases - 1 if dragged from inventory to empty equipment slot
// 2- if dragged from ivnentory to occupied equipment slot
// if 1 case - set last inventory slot to empty and update equipment slot to that item
// if 2 case - if items are the same type switch them, in other case do nothing

export const updateInventoryToEquipment = async (
  req: Request,
  res: Response
) => {
  const { characterId, item, itemType, inventorySlotIndex } = req.body;

  try {
    const character: ICharacter | null = await Character.findById(characterId);

    if (!character) {
      return res.status(404).json({ message: "Character not found" });
    }

    const isAuthenticated = checkAuth(character.owner, req.headers.authorization);
      if (!isAuthenticated) {
        return res.status(403).json({ message: "Unauthorized" });
      }

    const equipmentItem = character.equipment.find(
      (slot) => slot.type === itemType
    );

    const inventorySlot = character.inventory.find(
      (slot) => slot.slotIndex === inventorySlotIndex
    );

    if (!equipmentItem || !inventorySlot) {
      return res.status(404).json({ message: "Inventory slot not found" });
    }

    if (
      equipmentItem.item !== null &&
      inventorySlot.item !== null &&
      (inventorySlot.item.type === itemType ||
        inventorySlot.item.subType === itemType)
    ) {
      // check if required level is not too big
      if (
        inventorySlot.item?.requiredLevel &&
        inventorySlot.item.requiredLevel > character.progression.level
      ) {
        return res
          .status(400)
          .json({ message: "Your level is too low to equip this item" });
      }
      const equippedItem = equipmentItem.item;
      const inventoryItem = item;
      equipmentItem.item = inventoryItem;
      inventorySlot.item = equippedItem;
    } else if (
      equipmentItem.item === null &&
      inventorySlot.item !== null &&
      (inventorySlot.item.type === itemType ||
        inventorySlot.item.subType === itemType)
    ) {
      // check if required level is not too big
      if (
        inventorySlot.item?.requiredLevel &&
        inventorySlot.item.requiredLevel > character.progression.level
      ) {
        return res
          .status(400)
          .json({ message: "Your level is too low to equip this item" });
      }
      equipmentItem.item = item;
      inventorySlot.item = null;
    }
    await getUpdatedValues(character);
    
    getValuesWithStatistics(character);

    await character.save();
    res.json(character);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
