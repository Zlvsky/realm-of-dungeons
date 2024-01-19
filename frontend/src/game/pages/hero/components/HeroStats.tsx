import { useState } from "react";
import { Container, Text } from "@pixi/react";
import { ICharacter } from "../../../../interfaces/MainInterface";
import ProgressStat from "./ProgressStat";

import MeleeIcon from "../../../../assets/images/icons/stats/melee.png";
import DistanceIcon from "../../../../assets/images/icons/stats/distance.png";
import MagicIcon from "../../../../assets/images/icons/stats/magic.png";
import ResistanceIcon from "../../../../assets/images/icons/stats/resistance.png";
import DefenseIcon from "../../../../assets/images/icons/stats/defense.png";
import LuckIcon from "../../../../assets/images/icons/stats/luck.png";
import DynamicStat from "./DynamicStat";
import InfoPopup, { InfoPopupTextStyle } from "../../../components/ui/InfoPopup";

interface IHeroStats {
  hero: ICharacter,
  showPopups?: boolean,
}

interface IStatsPopups {
  currentStatHovered: number | null;
  hero: ICharacter;
}

const getStatProgress = (progression: any, stat: "melee" | "distance" | "magic" | "resistance") => {
  return `${
    100 -
    Math.round(
      ((progression[stat].experience -
        progression[stat].previousLevelExperience) /
        (progression[stat].levelExperience -
          progression[stat].previousLevelExperience)) *
        100
    )
  }% to next level`;
}

const StatsPopups = ({ currentStatHovered, hero }: IStatsPopups) => {
  const textStyle = InfoPopupTextStyle("#ffffff", 260);

  const updatedStats = hero.updatedValues.statistics;
  const baseStats = hero.statistics;
  const progression = hero.progression.statistics;
    
  return (
    <>
      <InfoPopup
        position={[110, -5]}
        show={currentStatHovered === 1}
        height={110}
      >
        <Container>
          <Text text="Melee skill" style={textStyle} />
          <Text y={30} text={`Base: ${baseStats.melee}`} style={textStyle} />
          <Text
            y={50}
            text={`Bonus: ${updatedStats.melee - baseStats.melee}`}
            style={textStyle}
          />
          <Text
            y={80}
            text={getStatProgress(progression, "melee")}
            style={textStyle}
          />
        </Container>
      </InfoPopup>
      <InfoPopup
        position={[110, 65]}
        show={currentStatHovered === 2}
        height={110}
      >
        <Container>
          <Text text="Distance skill" style={textStyle} />
          <Text y={30} text={`Base: ${baseStats.distance}`} style={textStyle} />
          <Text
            y={50}
            text={`Bonus: ${updatedStats.distance - baseStats.distance}`}
            style={textStyle}
          />
          <Text
            y={80}
            text={getStatProgress(progression, "distance")}
            style={textStyle}
          />
        </Container>
      </InfoPopup>
      <InfoPopup
        position={[110, 135]}
        show={currentStatHovered === 3}
        height={110}
      >
        <Container>
          <Text text="Magic level" style={textStyle} />
          <Text y={30} text={`Base: ${baseStats.magic}`} style={textStyle} />
          <Text
            y={50}
            text={`Bonus: ${updatedStats.magic - baseStats.magic}`}
            style={textStyle}
          />
          <Text
            y={80}
            text={getStatProgress(progression, "magic")}
            style={textStyle}
          />
        </Container>
      </InfoPopup>
      <InfoPopup
        position={[110, 205]}
        show={currentStatHovered === 4}
        height={110}
      >
        <Container>
          <Text text="Resistance level" style={textStyle} />
          <Text
            y={30}
            text={`Base: ${baseStats.resistance}`}
            style={textStyle}
          />
          <Text
            y={50}
            text={`Bonus: ${updatedStats.resistance - baseStats.resistance}`}
            style={textStyle}
          />
          <Text
            y={80}
            text={getStatProgress(progression, "resistance")}
            style={textStyle}
          />
        </Container>
      </InfoPopup>
      <InfoPopup
        position={[110, 295]}
        show={currentStatHovered === 5}
        width={260}
      >
        <Container>
          <Text text="Defense" style={textStyle} />
          <Text
            y={30}
            text={`Increases your damage reduction.`}
            style={textStyle}
          />
          <Text
            y={60}
            text={`Min: ${Math.round(hero.updatedValues.armor / 2)} dmg.`}
            style={textStyle}
          />
          <Text
            y={80}
            text={`Max: ${Math.round(hero.updatedValues.armor - 1)} dmg. (50%)`}
            style={textStyle}
          />
        </Container>
      </InfoPopup>
      <InfoPopup
        position={[450, 295]}
        show={currentStatHovered === 6}
        height={110}
        width={150}
      >
        <Container>
          <Text text="Luck" style={textStyle} />
          <Text y={30} text={`Coming soon...`} style={textStyle} />
        </Container>
      </InfoPopup>
    </>
  );
};

function  HeroStats({ hero, showPopups=false }: IHeroStats) {
  const [currentStatHovered, setCurrentStatHovered] = useState<any>(null)

  const handleShowPopup = (index: number) => {
    setCurrentStatHovered(index);
  }

  const handleHidePopup = () => {
    setCurrentStatHovered(null);
  }

  return (
    <Container position={[0, 430]}>
      <ProgressStat
        position={[0, 0]}
        stat="MELEE"
        icon={MeleeIcon}
        level={hero.updatedValues.statistics.melee}
        progress={hero.progression.statistics.melee}
        showPopup={showPopups ? () => handleShowPopup(1) : null}
        hidePopup={showPopups ? () => handleHidePopup() : null}
      />
      <ProgressStat
        position={[0, 70]}
        stat="DISTANCE"
        icon={DistanceIcon}
        level={hero.updatedValues.statistics.distance}
        progress={hero.progression.statistics.distance}
        showPopup={showPopups ? () => handleShowPopup(2) : null}
        hidePopup={showPopups ? () => handleHidePopup() : null}
      />
      <ProgressStat
        position={[0, 140]}
        stat="MAGIC"
        icon={MagicIcon}
        level={hero.updatedValues.statistics.magic}
        progress={hero.progression.statistics.magic}
        showPopup={showPopups ? () => handleShowPopup(3) : null}
        hidePopup={showPopups ? () => handleHidePopup() : null}
      />
      <ProgressStat
        position={[0, 210]}
        stat="RESISTANCE"
        icon={ResistanceIcon}
        level={hero.updatedValues.statistics.resistance}
        progress={hero.progression.statistics.resistance}
        showPopup={showPopups ? () => handleShowPopup(4) : null}
        hidePopup={showPopups ? () => handleHidePopup() : null}
      />
      <DynamicStat
        position={[0, 300]}
        stat={"DEFENSE"}
        icon={DefenseIcon}
        level={hero.updatedValues.armor}
        showPopup={showPopups ? () => handleShowPopup(5) : null}
        hidePopup={showPopups ? () => handleHidePopup() : null}
      />
      <DynamicStat
        position={[360, 300]}
        stat={"LUCK"}
        icon={LuckIcon}
        level={hero.updatedValues.statistics.luck}
        showPopup={showPopups ? () => handleShowPopup(6) : null}
        hidePopup={showPopups ? () => handleHidePopup() : null}
      />
      {showPopups && (
        <StatsPopups hero={hero} currentStatHovered={currentStatHovered} />
      )}
    </Container>
  );
}

export default HeroStats;
