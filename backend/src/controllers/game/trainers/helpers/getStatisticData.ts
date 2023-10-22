import { ICharacter } from "../../../../types/account/MainInterfaces";
import trainingFees from "./trainingFees";

export const getStatisticData = (stat: string, character: ICharacter) => {
  switch (stat) {
    case "MELEE":
      return {
        statLevel: character.statistics.melee,
        statProgression: character.progression.statistics.melee,
        trainingFee: trainingFees[character.statistics.melee],
      };
    case "DISTANCE":
      return {
        statLevel: character.statistics.distance,
        statProgression: character.progression.statistics.distance,
        trainingFee: trainingFees[character.statistics.distance],
      };
    case "MAGIC":
      return {
        statLevel: character.statistics.magic,
        statProgression: character.progression.statistics.magic,
        trainingFee: trainingFees[character.statistics.magic],
      };
    case "RESISTANCE":
      return {
        statLevel: character.statistics.resistance,
        statProgression: character.progression.statistics.resistance,
        trainingFee: trainingFees[character.statistics.resistance],
      };
  }
};
