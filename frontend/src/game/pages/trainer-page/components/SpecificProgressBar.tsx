import { useState, useEffect } from 'react';
import ProgressStat from '../../hero/components/ProgressStat';
import { ICharacter } from '../../../../interfaces/MainInterface';

import MeleeIcon from "../../../../assets/images/icons/stats/melee.png";
import DistanceIcon from "../../../../assets/images/icons/stats/distance.png";
import MagicIcon from "../../../../assets/images/icons/stats/magic.png";
import ResistanceIcon from "../../../../assets/images/icons/stats/resistance.png";


interface ITrainingProgressBar {
    hero: ICharacter;
    currentTrainer: string;
}

const getProgressBarData = (currentTrainer: string, hero: ICharacter) => {
  switch (currentTrainer) {
    case "Melee Trainer":
      return {
        stat: "MELEE",
        icon: MeleeIcon,
        level: hero.updatedValues.statistics.melee,
        progress: hero.progression.statistics.melee,
      };

    case "Distance Trainer":
      return {
        stat: "DISTANCE",
        icon: DistanceIcon,
        level: hero.updatedValues.statistics.distance,
        progress: hero.progression.statistics.distance,
      };

    case "Magic Trainer":
      return {
        stat: "MAGIC",
        icon: MagicIcon,
        level: hero.updatedValues.statistics.magic,
        progress: hero.progression.statistics.magic,
      };

    case "Resistance Trainer":
      return {
        stat: "RESISTANCE",
        icon: ResistanceIcon,
        level: hero.updatedValues.statistics.resistance,
        progress: hero.progression.statistics.resistance,
      };
  }
};

function SpecificProgressBar({ hero, currentTrainer }: ITrainingProgressBar) {
    const [statisticData, setStatisticData] = useState(getProgressBarData(currentTrainer, hero)!);

    useEffect(() => {
      setStatisticData(getProgressBarData(currentTrainer, hero)!);
    }, [hero]);
    
    return (
      <ProgressStat
        position={[15, 390]}
        stat={statisticData?.stat}
        icon={statisticData?.icon}
        level={statisticData?.level}
        progress={statisticData?.progress}
      />
    );
}

export default SpecificProgressBar;