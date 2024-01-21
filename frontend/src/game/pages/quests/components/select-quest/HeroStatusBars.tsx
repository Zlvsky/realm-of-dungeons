import { Container, Graphics, Text, TilingSprite } from '@pixi/react';
import React, { useState } from 'react';
import { IHeroProp } from '../../../../../interfaces/ComponentsInterfaces';
import BgPattern from "../../../../../assets/images/dark_wall.png";
import { TextStyle } from 'pixi.js';
import InfoPopup, { InfoPopupTextStyle } from '../../../../components/ui/InfoPopup';

const BaseBar = ({ position, children }: any) => {
    return (
      <Container position={position}>
        <TilingSprite
          image={BgPattern}
          width={420}
          height={50}
          tilePosition={{ x: 0, y: 0 }}
        />
        <Graphics
          x={0}
          y={0}
          draw={(g) => {
            g.clear();
            g.lineStyle(5, 0x1b1b1b);
            g.drawRect(0, 0, 420, 50);
            g.endFill();
          }}
        />
        {children}
      </Container>
    );
}

const HealthStatusBar = ( {hero}: IHeroProp ) => {
    const healthPercentage =
      hero.updatedValues.health / hero.updatedValues.maxHealth; 

    return (
      <BaseBar position={[70, 40]}>
        <Graphics
          x={2}
          y={3}
          draw={(g) => {
            g.clear();
            g.beginFill(0x933824, 0.8);
            g.drawRect(0, 0, 415 * healthPercentage, 44);
            g.endFill();
          }}
        />
        <Text
          text={`HP: ${hero.updatedValues.health}/${hero.updatedValues.maxHealth}`}
          x={420 / 2}
          y={50 / 2}
          anchor={0.5}
          style={
            new TextStyle({
              align: "center",
              fontFamily: "MedievalSharp",
              fontSize: 20,
              fontWeight: "400",
              fill: ["#ffffff"],
              letterSpacing: 0.5,
            })
          }
        />
      </BaseBar>
    );
}
const StaminaStatusBar = ( {hero}: IHeroProp ) => {
    const [staminaHovered, setStaminaHovered] = useState(false);

    const handleShowPopup = () => setStaminaHovered(true);
    const handleHidePopup = () => setStaminaHovered(false);

    const staminaPercentage = hero.extras.stamina / 120; 

      const textStyle = InfoPopupTextStyle();

    return (
      <BaseBar position={[800, 40]}>
        <Graphics
          x={2}
          y={3}
          draw={(g) => {
            g.clear();
            g.beginFill("#b8671c", 0.5);
            g.drawRect(0, 0, 415 * staminaPercentage, 44);
            g.endFill();
          }}
        />
        <Text
          text={`Stamina: ${hero.extras.stamina}/120`}
          x={420 / 2}
          y={50 / 2}
          anchor={0.5}
          interactive={true}
          onpointerenter={handleShowPopup}
          onpointerleave={handleHidePopup}
          style={
            new TextStyle({
              align: "center",
              fontFamily: "MedievalSharp",
              fontSize: 20,
              fontWeight: "400",
              fill: ["#ffffff"],
              letterSpacing: 0.5,
            })
          }
        />
        <InfoPopup position={[90, -10]} height={100} show={staminaHovered}>
          <Container>
            <Text
              text={"If you use up all your stamina, you can still participate in quests but the amount of xp gained will be less"}
              style={textStyle}
            />
          </Container>
        </InfoPopup>
      </BaseBar>
    );
}

function HeroStatusBars({ hero }: IHeroProp) {
    return (
      <Container position={[0, 800]}>
        <HealthStatusBar hero={hero} />
        <StaminaStatusBar hero={hero} />
      </Container>
    );
}

export default HeroStatusBars;