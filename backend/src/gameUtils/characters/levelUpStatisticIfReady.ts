import { ICharacter } from "../../types/account/MainInterfaces";
import getNextStatisticLevelExperience from "./getNextStatisticLevelExperience";
import updateCharacterValues from "./getUpdatedValues";
import getValuesWithStatistics from "./getValuesWithStatistics";

async function levelUpStatisticIfReady(
  character: ICharacter,
  statistic: keyof typeof character.progression.statistics
) {
  if (
    character.progression.statistics[statistic].experience >=
    character.progression.statistics[statistic].levelExperience
  ) {
    character.statistics[statistic] += 1;
    character.progression.statistics[statistic].previousLevelExperience =
      character.progression.statistics[statistic].levelExperience;
    character.progression.statistics[statistic].levelExperience =
      getNextStatisticLevelExperience[character.statistics[statistic]];

    await updateCharacterValues(character);

    getValuesWithStatistics(character);
  }
}

export default levelUpStatisticIfReady;
