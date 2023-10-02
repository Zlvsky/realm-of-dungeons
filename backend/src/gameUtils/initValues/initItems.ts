import { armors } from "./data/armors";
import { potions } from "./data/potions";
import { weapons } from "./data/weapons";

const initItems = () => {

    return [
        ...weapons,
        ...armors,
        ...potions
    ];
};

export default initItems;
