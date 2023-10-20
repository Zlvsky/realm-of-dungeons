import { ICharacter } from "../../types/account/MainInterfaces";
import getNextLevelExperience from "./getNextLevelExperience";

const classHitPointGain = (heroClass: string) => {
  switch (heroClass) {
    case "warrior":
      return 15;
    case "archer":
      return 10;
    case "mage":
      return 5;
  }
}

function levelUpIfReady(character: ICharacter) {
  if (character.progression.experience >= character.progression.levelExperience) {
    character.progression.level += 1;
    character.progression.previousLevelExperience = character.progression.levelExperience;
    character.progression.levelExperience = getNextLevelExperience[character.progression.level];

    const healthGain = classHitPointGain(character.class)!;
    character.generalValues.basicHealth += healthGain;
    character.updatedValues.maxHealth += healthGain;
    character.updatedValues.health = character.updatedValues.maxHealth;
    
  }
}

export default levelUpIfReady;