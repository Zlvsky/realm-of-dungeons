import { ICharacter, IItem } from "../../../../types/account/MainInterfaces";

const handleUsePotion = (potion: IItem, character: ICharacter) => {
    const potionName = potion.name.toLowerCase();
    const characterValues = character.updatedValues;

    if (potionName.includes("health")) {
        let healthToRecover = 0;
        if (potionName.includes("big")) healthToRecover = Math.round(characterValues.maxHealth * 0.4);
        else if (potionName.includes("small")) healthToRecover = Math.round(characterValues.maxHealth * 0.2);
        characterValues.health += healthToRecover;
        if (characterValues.health > characterValues.maxHealth) {
          characterValues.health = characterValues.maxHealth;
        }
        return "You've regenerated some health";
    } else {
        return false;
    }
}

export default handleUsePotion;