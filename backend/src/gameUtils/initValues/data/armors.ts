// items ID
// 1100/1200 - heads armor
// 1300/1400 - chests armor
// 1500/1600 - legs armor

import { IItemObject } from "../../../types/account/MainInterfaces";
import { chests } from "./armor-types/chests";
import { heads } from "./armor-types/heads";
import { legs } from "./armor-types/legs";

interface IArmorObjectHelper {
  noMinLevel: IItemObject[];
  minLevel10: IItemObject[];
  minLevel20?: IItemObject[];
  minLevel30?: IItemObject[];
}

export interface IArmorObject {
  cloth: IArmorObjectHelper;
  leather: IArmorObjectHelper;
  plate: IArmorObjectHelper;
}

const headsArray = [
  ...heads.cloth.noMinLevel,
  ...heads.leather.noMinLevel,
  ...heads.cloth.noMinLevel,

  ...heads.cloth.minLevel10,
  ...heads.leather.minLevel10,
  ...heads.cloth.minLevel10,
];

const chestsArray = [
  ...chests.cloth.noMinLevel,
  ...chests.leather.noMinLevel,
  ...chests.cloth.noMinLevel,

  ...chests.cloth.minLevel10,
  ...chests.leather.minLevel10,
  ...chests.cloth.minLevel10,
];

const legsArray = [
  ...legs.cloth.noMinLevel,
  ...legs.leather.noMinLevel,
  ...legs.cloth.noMinLevel,

  ...legs.cloth.minLevel10,
  ...legs.leather.minLevel10,
  ...legs.cloth.minLevel10,
];

export const armors: IItemObject[] = [
  ...headsArray,
  ...chestsArray,
  ...legsArray
];
