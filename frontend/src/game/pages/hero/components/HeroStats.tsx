import { Container } from "@pixi/react";
import { ICharacter } from "../../../../interfaces/MainInterface";
import ProgressStat from "./ProgressStat";

import MeleeIcon from "../../../../assets/images/icons/stats/melee.png";
import DistanceIcon from "../../../../assets/images/icons/stats/distance.png";
import MagicIcon from "../../../../assets/images/icons/stats/magic.png";
import ResistanceIcon from "../../../../assets/images/icons/stats/resistance.png";
import DefenseIcon from "../../../../assets/images/icons/stats/defense.png";
import LuckIcon from "../../../../assets/images/icons/stats/luck.png";
import DynamicStat from "./DynamicStat";

interface IHeroStats {
  hero: ICharacter,
}

function  HeroStats({ hero }: IHeroStats) {

  return (
    <Container position={[0, 430]}>
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
      <DynamicStat
        position={[0, 300]}
        stat={"DEFENSE"}
        icon={DefenseIcon}
        level={hero.updatedValues.armor}
      />
      <DynamicStat
        position={[360, 300]}
        stat={"LUCK"}
        icon={LuckIcon}
        level={hero.updatedValues.statistics.luck}
      />
    </Container>
  );
}

export default HeroStats;
