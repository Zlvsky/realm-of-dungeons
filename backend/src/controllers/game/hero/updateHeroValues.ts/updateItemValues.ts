import { Item } from "../../../../schemas/game/itemSchema"
import { IItem } from "../../../../types/account/MainInterfaces"

export const updateItemValue = async (itemId: string) => {
    try {
        const valuesToUpdate = [];
        const item: IItem | null = await Item.findById(itemId);
        if (!item) return false;
        if (item.type === "weapon") {
            const damage =  Math.round((item.minDamage! + item.maxDamage!) / 2);
            valuesToUpdate.push({
                object: "values",
                field: "damage",
                value: damage
            });
        }
        else if (item.type === "helmet" || item.type === "armor" || item.type === "legs") {
            valuesToUpdate.push({
              object: "values",
              field: "armor",
              value: item.armor,
            });
        }
        if (Object.keys(item.statistics).length > 0) {
            const stats = Object.keys(item.statistics);
            const itemStats: any = item.statistics;
            stats.forEach((stat) => {
                valuesToUpdate.push({
                  object: "statistics",
                  field: stat,
                  value: itemStats[`${stat}`],
                });
            })
        }
    } catch (err) {
        console.error(err);
    }
}