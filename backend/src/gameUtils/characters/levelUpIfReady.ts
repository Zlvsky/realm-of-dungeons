import { ICharacter } from "../../types/account/MainInterfaces";
import getNextLevelExperience from "./getNextLevelExperience";

function levelUpIfReady(character: ICharacter) {
  if (character.progression.experience >= character.progression.levelExperience) {
    character.progression.level += 1;
    character.progression.previousLevelExperience = character.progression.levelExperience;
    character.progression.levelExperience = getNextLevelExperience[character.progression.level];
  }
}

export default levelUpIfReady;