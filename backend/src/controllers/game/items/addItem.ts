import express, { Request, Response } from "express";
import { Item } from "../../../schemas/game/itemSchema";

const router = express.Router();

const isIncluded = (value: any) => {
  if (value && value.toString().length > 0) return true;
  return false;
} 

export const addItem = async (req: Request, res: Response) => {
  try {
    const statistics = {
      strength: req.body.strength,
      condition: req.body.condition,
      dexterity: req.body.dexterity,
      wisdom: req.body.wisdom,
      intelligence: req.body.intelligence,
      charisma: req.body.charisma,
    }; 

    const item = new Item({
      name: req.body.name,
      type: req.body.type,
      image: req.body.image,
      statistics: statistics,
      value: req.body.value,
    });

    if (isIncluded(req.body.minDamage)) {
      item.minDamage = Number(req.body.minDamage);
    } 

    if (isIncluded(req.body.maxDamage)) {
      item.maxDamage = Number(req.body.maxDamage);
    } 
    
    if (isIncluded(req.body.subType)) {
      item.subType = req.body.subType;
    } 

    if (isIncluded(req.body.armor)) {
      item.armor = Number(req.body.armor);
    } 
    
    await item.save();

    res.status(200).json(item);
} catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

export default router;
