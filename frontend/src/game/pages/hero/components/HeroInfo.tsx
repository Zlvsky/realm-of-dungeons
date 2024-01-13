import { useState } from "react";
import { Container, Sprite, Text, Graphics } from "@pixi/react";
import { TextStyle } from 'pixi.js';
import { IHeroProp } from '../../../../interfaces/ComponentsInterfaces';
import InfoPopup, { InfoPopupTextStyle } from "../../../components/ui/InfoPopup";

const CharacterName = ({ nickname }: any) => {
  return (
    <Container position={[0, -30]}>
      <Text
        text={`${nickname}`}
        anchor={0.5}
        x={250 / 2}
        y={12}
        style={
          new TextStyle({
            align: "center",
            fontFamily: "MedievalSharp",
            fontWeight: "700",
            letterSpacing: 0.6,
            fontSize: 25,
            fill: ["#932424"],
          })
        }
      />
    </Container>
  );
}

const ExpPopupInfo = ({ hero, showExp }: any) => {
  const currentExp = hero.progression.experience;
  const nextLevelExp = hero.progression.levelExperience;

  const textStyle = InfoPopupTextStyle();

  return (
    <InfoPopup position={[5, 240]} show={showExp} height={50}>
      <Container>
        <Text text={`Exp: ${currentExp}`} style={textStyle} />
        <Text text={`Next level: ${nextLevelExp}`} y={20} style={textStyle} />
      </Container>
    </InfoPopup>
  );
}

function HeroInfo({ hero }: IHeroProp) {
    const [showExp, setShowExp] = useState(false);

    const handleShowExp = () => setShowExp(true);
    const handleHideExp = () => setShowExp(false);

    const levelPercentage = ((hero.progression.experience - hero.progression.previousLevelExperience) / (hero.progression.levelExperience - hero.progression.previousLevelExperience));
    
    return (
      <Container position={[120, 0]}>
        <Sprite
          image={hero?.avatar}
          position={[0, 0]}
          width={250}
          height={250}
        />
        <CharacterName nickname={hero.nickname} />
        <Container position={[0, 250]} interactive={true} onpointerenter={handleShowExp} onpointerleave={handleHideExp}>
          <Graphics
            x={0}
            y={0}
            draw={(g) => {
              g.clear();
              g.lineStyle(2, 0x656565);
              g.drawRect(0, 0, 250, 40);
              g.endFill();
            }}
            interactive={true}
          />
          <Graphics
            x={1}
            y={1}
            draw={(g) => {
              g.clear();
              g.beginFill(0x751400);
              g.drawRect(0, 0, 248 * levelPercentage, 38);
              g.endFill();
            }}
            interactive={true}
          />
          <Text
            text={`LEVEL ${hero.progression.level}`}
            anchor={0.5}
            x={250 / 2}
            y={20}
            style={
              new TextStyle({
                align: "center",
                fontFamily: "MedievalSharp",
                fontSize: 20,
                fill: ["#ffffff"],
              })
            }
          />
        </Container>
        <ExpPopupInfo hero={hero} showExp={showExp} />
        <Container position={[0, 310]}>
          <Text
            text={`Hit points: ${hero.updatedValues.health} / ${hero.updatedValues.maxHealth}`}
            x={0}
            y={0}
            style={
              new TextStyle({
                align: "center",
                fontFamily: "MedievalSharp",
                fontSize: 20,
                fill: ["#ffffff"],
              })
            }
          />
          <Text
            text={`Damage: ${hero.updatedValues.minDmg} - ${hero.updatedValues.maxDmg}`}
            x={0}
            y={25}
            style={
              new TextStyle({
                align: "center",
                fontFamily: "MedievalSharp",
                fontSize: 20,
                fill: ["#ffffff"],
              })
            }
          />
        </Container>
      </Container>
    );
}

export default HeroInfo;