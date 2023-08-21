import { ColorMatrixFilter, Filter } from "pixi.js";
import { Container, Sprite, Text, withFilters } from "@pixi/react";
import { TextStyle } from "pixi.js";
import plusbtn from "../../../../assets/images/plusbtn.png";
import { updateStatistics } from "../../../../client/appClient";
import { setHero } from "../../../../redux/reducers/gameSlice";
import { connect } from "react-redux";
import fetchHero from "../../../../utils/fetchers/fetchHero";

type Statistic = "strength" | "dexterity" | "intelligence" | "condition" | "wisdom" | "charisma";

interface ISingleStat {
  position: [number, number];
  stat: Statistic
  col: number;
}

const Filters: any = withFilters(Container, {
  matrix: ColorMatrixFilter,
});

function HeroStats({ hero, updateHero }: any) {
  const updateStatistic = async (
    statistic: Statistic
  ) => {
    const response = await updateStatistics({ statistic });
    if (response.status !== 200) return false;
    fetchHero(updateHero);
    return true;
  };

  const SingleStat = ({ position, stat, col }: ISingleStat) => {
    const isAvailable = hero.progression.availableStatPoints > 0;

    const handleUpdate = (statistic: Statistic) => {
      if (isAvailable) updateStatistic(statistic);
    }

    return (
      <Container position={position}>
        <Text
          text={`${stat.toUpperCase()}`}
          x={0}
          y={0}
          style={
            new TextStyle({
              align: "center",
              fontFamily: "MedievalSharp",
              letterSpacing: 1,
              fontSize: 24,
              fill: ["#898989"],
            })
          }
        />
        <Text
          text={hero.heroValuesWithItems.statistics[stat]}
          x={0}
          y={30}
          style={
            new TextStyle({
              align: "center",
              fontFamily: "MedievalSharp",
              fontSize: 24,
              fill: ["#D1D1D1"],
            })
          }
        />
        <Filters
          matrix={{ enabled: true }}
          apply={
            !isAvailable
              ? ({ matrix }: any) => matrix.blackAndWhite()
              : undefined
          }
        >
          <Sprite
            image={plusbtn}
            width={55}
            height={55}
            x={col === 1 ? 190 : 160}
            y={-14}
            cursor={isAvailable ? "pointer" : "normal"}
            interactive={true}
            onclick={() => handleUpdate(stat)}
          />
        </Filters>
      </Container>
    );
  };

  return (
    <Container position={[0, 430]}>
      <SingleStat position={[0, 0]} stat={"strength"} col={1} />
      <SingleStat position={[0, 80]} stat={"dexterity"} col={1} />
      <SingleStat position={[0, 160]} stat={"intelligence"} col={1} />
      <SingleStat position={[280, 0]} stat={"condition"} col={2} />
      <SingleStat position={[280, 80]} stat={"wisdom"} col={2} />
      <SingleStat position={[280, 160]} stat={"charisma"} col={2} />
    </Container>
  );
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateHero: (data: any) => dispatch(setHero(data)),
  };
};

export default connect(null, mapDispatchToProps)(HeroStats);
