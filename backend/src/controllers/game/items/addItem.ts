import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { Item } from "../../../schemas/game/itemSchema";

const router = express.Router();

export const addItem = async (req: Request, res: Response) => {
  try {
    const item = new Item({
      name: req.body.name,
      type: req.body.type,
      minDamage: req.body.minDamage,
      maxDamage: req.body.maxDamage,
      image: req.body.image,
      statistics: req.body.statistics,
    });

    await item.save();

    res.status(200).json(item);
} catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

export default router;
