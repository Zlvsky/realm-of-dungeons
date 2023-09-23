// items ID
// 2100 - distance weapons
// 2200 - magic weapons
// 2300 - melee weapons - sword
// 2400 - melee weapons - axe
// 2500 - melee weapons - mace


import { IItemObject } from "../../../types/account/MainInterfaces";
import { axes } from "./weapons-categories/axes";
import { distanceWeapons } from "./weapons-categories/distance";
import { maces } from "./weapons-categories/maces";
import { magicWeapons } from "./weapons-categories/magic";
import { swords } from "./weapons-categories/swords";

export interface IWeaponObject {
  noMinLevel: IItemObject[];
  minLevel10: IItemObject[];
  minLevel20?: IItemObject[];
  minLevel30?: IItemObject[];
}

const meleeWeapons: IWeaponObject = {
  noMinLevel: [
    ...swords.noMinLevel,
    ...axes.noMinLevel,
    ...maces.noMinLevel,
  ],
  minLevel10: [
    ...swords.minLevel10,
    ...axes.minLevel10,
    ...maces.minLevel10,
  ],
};

export const weapons: IItemObject[] = [
  ...meleeWeapons.noMinLevel,
  ...meleeWeapons.minLevel10,
  ...magicWeapons.noMinLevel,
  ...magicWeapons.minLevel10,
  ...distanceWeapons.noMinLevel,
  ...distanceWeapons.minLevel10,
];
