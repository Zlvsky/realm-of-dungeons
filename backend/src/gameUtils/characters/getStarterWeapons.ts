import { axes } from "../initValues/data/weapons-categories/axes";
import { distanceWeapons } from "../initValues/data/weapons-categories/distance";
import { maces } from "../initValues/data/weapons-categories/maces";
import { magicWeapons } from "../initValues/data/weapons-categories/magic";
import { swords } from "../initValues/data/weapons-categories/swords";

const getWarriorWeapons = () => {
    const startingSword = swords.noMinLevel[0];
    const startingAxe = axes.noMinLevel[0];
    const startingMace = maces.noMinLevel[0];
    return [startingSword, startingAxe, startingMace];
};
const getMageWeapons = () => {
    const startingWand = magicWeapons.noMinLevel[0];
    return [startingWand];
};
const getArcherWeapons = () => {
    const startingBow = distanceWeapons.noMinLevel[0];
    return [startingBow];
};



const getStarterWeapons = (heroClass: "warrior" | "mage" | "archer") => {
  switch (heroClass) {
    case "warrior":
      return getWarriorWeapons();
    case "mage":
      return getMageWeapons();
    case "archer":
      return getArcherWeapons();
    default:
      return null;
  }
};

export default getStarterWeapons;
