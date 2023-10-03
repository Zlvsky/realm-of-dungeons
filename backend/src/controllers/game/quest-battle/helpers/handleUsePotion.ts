import { ICharacter, IItem } from "../../../../types/account/MainInterfaces";

// health potions item ids 10-20
// mana potions item ids 30-40

const handleUsePotion = (potion: IItem, character: ICharacter) => {
    const characterValues = character.updatedValues;

    if (potion.subType === "health") {
        let healthToRecover = 0;
        if (potion.itemId === 10) healthToRecover = Math.round(characterValues.maxHealth * 0.2);
        else if (potion.itemId === 11) healthToRecover = Math.round(characterValues.maxHealth * 0.1);
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