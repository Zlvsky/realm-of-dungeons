import express, { Request, Response } from "express";
import mongoose from "mongoose";

import { Equipment } from "../../../schemas/game/equipmentSchema";
import { ICharacter, IEquipment } from "../../../types/account/MainInterfaces";
import { Character } from "../../../schemas/account/characterSchema";

export const updateEquipment = async (
  req: Request,
  res: Response
) => {
  const { characterId } = req.params;
  const { items } = req.body;

  try {
    const character: ICharacter | null = await Character.findOneAndUpdate(
      { characterId },
      { items },
      { new: true }
    );

    if (!equipment) {
      return res.status(404).json({ message: "Equipment not found" });
    }

    res.json(equipment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};