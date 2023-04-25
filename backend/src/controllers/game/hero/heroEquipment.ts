import express, { Request, Response } from "express";
import mongoose from "mongoose";

import { Equipment } from "../../../schemas/game/equipmentSchema";
import { ICharacter, IEquipment } from "../../../types/account/MainInterfaces";
import { Character } from "../../../schemas/account/characterSchema";

export const updateEquipment = async (
  req: Request,
  res: Response
) => {
  const { characterId, itemId, itemType } = req.body;

  try {
    const character: ICharacter | null = await Character.findOneAndUpdate(
      { _id: characterId, 'equipment.type': itemType },
      {'$set': {
        'equipment.$.item': itemId
      }}
    );

    if (!character) {
      return res.status(404).json({ message: "Equipment not found" });
    }

    res.json(character);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};