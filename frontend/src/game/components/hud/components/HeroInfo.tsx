import { Container, Sprite, Text } from "@pixi/react";
import { useSelector } from 'react-redux';
import { getHero } from '../../../../redux/reducers/gameSlice';
import { TextStyle } from 'pixi.js';

// assets
import Gold from "../../../../assets/images/icons/gui/gold-icon.png";

function HeroInfo() {
    const hero = useSelector(getHero);
    const RenderAvatar = () => {
        if(!hero?.avatar) return <></>
        return (
            <Sprite 
                image={hero?.avatar}
                position={[0, 30]}
                width={100} 
                height={100}
            />
        )
    }

    if (!hero) return null;
    
    return (
      <Container position={[0, 0]}>
        <RenderAvatar />
        <Text
          text={`LEVEL: ${hero.progression.level}`}
          x={110}
          y={30}
          style={
            new TextStyle({
              align: "left",
              fontFamily: "MedievalSharp",
              fontSize: 26,
              fill: ["#C02E07"], // gradient
              stroke: "#96663E",
              strokeThickness: 3,
              letterSpacing: 0,
              dropShadow: true,
              wordWrap: true,
              wordWrapWidth: 440,
            })
          }
        />
        <Sprite image={Gold} position={[110, 70]} width={35} height={40} />
        <Text
          x={150}
          y={72}
          text={hero.generalValues.gold.toFixed(2)}
          style={
            new TextStyle({
              align: "left",
              fontFamily: "MedievalSharp",
              fontSize: 26,
              fill: ["#C02E07"], // gradient
              stroke: "#96663E",
              strokeThickness: 2,
              letterSpacing: 0,
              dropShadow: true,
              wordWrap: true,
              wordWrapWidth: 440,
            })
          }
        />
      </Container>
    );
}

export default HeroInfo;