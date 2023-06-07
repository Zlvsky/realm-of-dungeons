import { ColorMatrixFilter, Filter } from "pixi.js";
import { Container, Sprite, Text, withFilters } from "@pixi/react";
import { TextStyle } from "pixi.js";
import plusbtn from "../../../../assets/images/plusbtn.png";
import React from "react";

interface ISingleStat {
  position: [number, number];
  stat: string;
}


const Filters: any = withFilters(Container, {
  matrix: ColorMatrixFilter,
});

function HeroStats({ hero }: any) {
  const SingleStat = ({ position, stat }: ISingleStat) => {
    const isAvailable = hero.progression.availableStatPoints > 0;
 
    return (
      <Container position={position} >
        <Text
          text={`${stat.toUpperCase()}`}
          x={0}
          y={0}
          style={
            new TextStyle({
              align: "center",
              fontFamily: "sans-serif",
              fontWeight: "200",
              fontSize: 24,
              fill: ["#898989"],
            })
          }
        />
        <Text
          text={hero.statistics[stat]}
          x={0}
          y={30}
          style={
            new TextStyle({
              align: "center",
              fontFamily: "sans-serif",
              fontWeight: "200",
              fontSize: 24,
              fill: ["#D1D1D1"],
            })
          }
        />
        <Filters
          matrix={{ enabled: true }}
          apply={!isAvailable ? ({ matrix }: any) => matrix.blackAndWhite() : undefined}
        >
          <Sprite
            image={plusbtn}
            width={55}
            height={55}
            x={170}
            y={-5}
            cursor={isAvailable ? "pointer" : "normal"}
            interactive={true}
            //   onclick={() => changeStage("quests")}
          />
        </Filters>
      </Container>
    );
  };

  return (
    <Container position={[10, 430]}>
      <SingleStat position={[0, 0]} stat={"strength"} />
    </Container>
  );
}

export default HeroStats;
