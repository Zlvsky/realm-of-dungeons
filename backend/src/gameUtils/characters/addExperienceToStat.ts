import { ICharacter } from "../../types/account/MainInterfaces";
import levelUpStatisticIfReady from "./levelUpStatisticIfReady";

const statXP = 1;

const addWeaponStatExperience = async (character: ICharacter) => {
    const weaponItem = character.equipment.find(item => item.type === "weapon");
    const weaponType = weaponItem?.item?.subType;
    if (!weaponType) return;
    if (weaponType === "axe" || weaponType === 'sword' || weaponType === "mace") {
        if (character.class === "warrior") character.progression.statistics.melee.experience += statXP;
        else if (character.class === "archer") character.progression.statistics.melee.experience += statXP * 0.5;
        else if (character.class === "mage") character.progression.statistics.melee.experience += statXP * 0.2;
        await levelUpStatisticIfReady(character, "melee");
    } else if (weaponType === "bow" || weaponType === "crossbow") {
        if (character.class === "warrior") character.progression.statistics.distance.experience += statXP * 0.5;
        else if (character.class === "archer") character.progression.statistics.distance.experience += statXP;
        else if (character.class === "mage") character.progression.statistics.distance.experience += statXP * 0.2;
        await levelUpStatisticIfReady(character, "distance");
    } else if (weaponType === "wand") {
        if (character.class === "warrior") character.progression.statistics.magic.experience += statXP * 0.2;
        else if (character.class === "archer") character.progression.statistics.magic.experience += statXP * 0.4;
        else if (character.class === "mage") character.progression.statistics.magic.experience += statXP;
        await levelUpStatisticIfReady(character, "magic");
    }
}

const addResistanceStatExperience = async (character: ICharacter) => {
  if (character.class === "warrior") character.progression.statistics.magic.experience += statXP;
  else if (character.class === "archer") character.progression.statistics.magic.experience += statXP * 0.7;
  else if (character.class === "mage") character.progression.statistics.magic.experience += statXP * 0.4;
  await levelUpStatisticIfReady(character, "resistance");
};

const addExperienceToStat = async (character: ICharacter, type: "weapon" | "resistance") => {
    if (type === "weapon") await addWeaponStatExperience(character);
    else await addResistanceStatExperience(character);
    
}

export default addExperienceToStat;