import { armors } from "./data/armors";
import { weapons } from "./data/weapons";

const initItems = () => {

    return [
        ...weapons,
        ...armors
    ];
};

export default initItems;
