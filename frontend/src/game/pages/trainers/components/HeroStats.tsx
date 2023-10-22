import { Container } from '@pixi/react';
import ProgressStat from '../../hero/components/ProgressStat';
import MeleeIcon from "../../../../assets/images/icons/stats/melee.png";
import DistanceIcon from "../../../../assets/images/icons/stats/distance.png";
import MagicIcon from "../../../../assets/images/icons/stats/magic.png";
import ResistanceIcon from "../../../../assets/images/icons/stats/resistance.png";
import { useSelector } from 'react-redux';
import { getHero } from '../../../../redux/reducers/gameSlice';

function HeroStats() {
    const hero = useSelector(getHero)!;

    return (
      <Container position={[410, 600]}>
        <ProgressStat
          position={[0, 0]}
          stat="MELEE"
          icon={MeleeIcon}
          level={hero.updatedValues.statistics.melee}
          progress={hero.progression.statistics.melee}
        />
        <ProgressStat
          position={[0, 70]}
          stat="DISTANCE"
          icon={DistanceIcon}
          level={hero.updatedValues.statistics.distance}
          progress={hero.progression.statistics.distance}
        />
        <ProgressStat
          position={[0, 140]}
          stat="MAGIC"
          icon={MagicIcon}
          level={hero.updatedValues.statistics.magic}
          progress={hero.progression.statistics.magic}
        />
        <ProgressStat
          position={[0, 210]}
          stat="RESISTANCE"
          icon={ResistanceIcon}
          level={hero.updatedValues.statistics.resistance}
          progress={hero.progression.statistics.resistance}
        />
      </Container>
    );
}

export default HeroStats;