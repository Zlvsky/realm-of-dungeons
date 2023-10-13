import { armors } from "./data/armors";
import { potions } from "./data/potions";
import { realmOrbsData } from "./data/realm-orbs";
import { weapons } from "./data/weapons";

const initItems = () => {

    return [
        ...weapons,
        ...armors,
        ...potions,
        ...realmOrbsData
    ];
};

export default initItems;
