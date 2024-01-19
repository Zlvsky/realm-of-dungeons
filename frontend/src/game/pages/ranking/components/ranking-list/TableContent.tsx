import { Container, Text } from "@pixi/react";
import { TextStyle } from "pixi.js";

const contentTextStyle = (isOwnHero: boolean, isSelected: boolean) => {
   const fillStyle = isOwnHero ? "#724C41" : isSelected ? "#B0421A" : "#dcdcdc"; 

   return new TextStyle({
     align: "left",
     fontFamily: "Almendra",
     fontWeight: "200",
     fontSize: 22,
     fill: fillStyle,
   });
}

function TableContent({ selectedHero, setSelectedHero, currentHeroId, data }: any) {
  const handleSelectHero = (id: string) => {
    setSelectedHero(id);
  };

  return (
    <Container position={[20, 60]}>
      {data?.items?.map((hero: any, index: number) => {
        const isOwnHero = hero._id === currentHeroId;
        const isSelected = hero._id === selectedHero;

        const textStyle = contentTextStyle(isOwnHero, isSelected);

        return (
          <Container
            position={[0, 30 * index]}
            key={"ranking_" + index}
            interactive={true}
            cursor="pointer"
            onpointerdown={() => handleSelectHero(hero._id)}
          >
            <Text
              text={`${index + 1 + (data?.currentPage - 1) * 24}`}
              style={textStyle}
            />
            <Text x={130} text={hero.nickname} style={textStyle} />
            <Text
              x={330}
              text={hero.progression.level.toString()}
              style={textStyle}
            />
            <Text
              x={470}
              text={
                hero.progression?.reputation
                  ? hero.progression.reputation.toString()
                  : "0"
              }
              style={textStyle}
            />
          </Container>
        );
      })}
    </Container>
  );
}

export default TableContent;