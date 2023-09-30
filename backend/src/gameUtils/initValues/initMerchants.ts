import { Item } from "../../schemas/game/itemSchema";
import { IItem, IMerchant } from "../../types/account/MainInterfaces";

const mapItems = (items: IItem[]) => {
  return items.map(item => {
    return {item: item}
  })
}

const getAlchemistStaticItems = (items: IItem[]) => {
  const filteredItems = items.filter(item => item.name.includes("health potion"));
  return mapItems(filteredItems);
}

 

const initMerchants = async (): Promise<IMerchant[]> => {
  const items = await Item.find();
  const alchemistStaticItems = getAlchemistStaticItems(items);


  return [
    {
      name: "Alchemist",
      itemTypes: ["potion", "herbs"],
      randomItems: false,
      interestedIn: ["potion", "herbs"],
      staticItems: alchemistStaticItems,
    },
    {
      name: "Treasurer",
      itemTypes: [],
      randomItems: false,
      interestedIn: ["loot"],
      staticItems: [],
    },
    {
      name: "Witch",
      itemTypes: ["staff", "wand", "spellbook"],
      randomItems: true,
      interestedIn: ["cloth", "staff", "wand", "spellbook"],
      staticItems: [],
    },
    {
      name: "Armourer",
      itemTypes: ["cloth armor", "leather armor", "plate armor"],
      randomItems: true,
      interestedIn: ["leather", "plate"],
      staticItems: [],
    },
    {
      name: "Weaponsmith",
      itemTypes: ["sword", "axe", "bow", "crossbow", "shield"],
      randomItems: true,
      interestedIn: ["sword", "axe", "mace", "bow", "crossbow", "shield"],
      staticItems: [],
    },
  ];
} 

export default initMerchants;
