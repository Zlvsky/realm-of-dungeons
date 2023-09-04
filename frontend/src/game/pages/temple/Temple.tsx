import { useState, useEffect, useCallback } from "react";
import { Container, Sprite, Graphics, Text } from "@pixi/react";
import { connect } from "react-redux";

import templebg from "../../../assets/images/game-world/temple.png";
import healbtn from "../../../assets/images/healbtn.png";
import { TextStyle } from "pixi.js";
import { templeHeal, templeRenew } from "../../../client/appClient";
import { setHero } from "../../../redux/reducers/gameSlice";
import fetchHero from "../../../utils/fetchers/fetchHero";
import secondsRemaining from "../../../utils/calculations/secondsRemaining";
import secondsToTimeHours from "../../../utils/parsing-data/secondsToTimeHours";
import { ICharacter } from "../../../interfaces/MainInterface";

const canvasWidth = 1316;
const canvasHeight = 937;
const rectWidth = 500;
const rectHeight = 560;

function Temple({ game, updateHero }: any) {
  const hero: ICharacter = game.hero;
  const [timeRemaining, setTimeRemaining] = useState<any>(null);
  const startX = (canvasWidth - rectWidth) / 2;
  const startY = (canvasHeight - rectHeight) / 2;
  const percentage = Math.floor(
    (hero.updatedValues.health / hero.updatedValues.maxHealth) * 360
  );
  const barColor = 0x932424;

  function calculateRemainingTime() {
    return new Promise<void>((resolve) => {
      const checkTimeRemaining = () => {
        const secondsLeft = secondsRemaining(hero.extras.healRenewDate!);
        if (secondsLeft < 0) {
          setTimeRemaining("00:00:00");
          resolve();
        } else {
          setTimeRemaining(secondsToTimeHours(secondsLeft));
          setTimeout(checkTimeRemaining, 1000); // check again in 100ms
        }
      };
      checkTimeRemaining();
    });
  }

  useEffect(() => {
    const handleTempleRenewRequest = async () => {
      const response = await templeRenew();
      if (response.status !== 200) return false;
      fetchHero(updateHero);
      return true;
    };
    handleTempleRenewRequest();
  }, []);

  useEffect(() => {
    if (hero.extras.healRenewDate) calculateRemainingTime();
  }, [hero]);

  const questFrame = useCallback((g: any) => {
    g.clear();

    g.beginFill(0x1f1f1f, 0.7);
    g.lineStyle(3, 0x1f1f1f, 1);

    g.moveTo(0, 0);
    g.lineTo(rectWidth, 0);
    g.lineTo(rectWidth, rectHeight);
    g.lineTo(0, rectHeight);
    g.lineTo(0, 0);

    g.endFill();
  }, []);

  const handleTempleHealRequest = async () => {
    const response = await templeHeal();
    if (response.status !== 200) return false;
    fetchHero(updateHero);
    return true;
  };

  return (
    <Container position={[0, 2]}>
      <Sprite image={templebg} width={1316} height={935} />
      <Container position={[startX, startY]}>
        <Graphics draw={questFrame} zIndex={10} />
        <Text
          text={"Current Health"}
          anchor={0.5}
          x={rectWidth / 2}
          y={50}
          style={
            new TextStyle({
              align: "center",
              fontFamily: "Almendra",
              fontSize: 30,
              letterSpacing: 1,
              fill: ["#ffffff"],
            })
          }
        />
        <Text
          text={`${hero.updatedValues.health}/${hero.updatedValues.maxHealth}`}
          anchor={0.5}
          x={rectWidth / 2}
          y={100}
          style={
            new TextStyle({
              align: "center",
              fontFamily: "MedievalSharp",
              fontSize: 20,
              letterSpacing: 1,
              fill: ["#ffffff"],
            })
          }
        />
        <Container position={[70, 150]}>
          <Graphics
            x={0}
            y={0}
            draw={(g) => {
              g.clear();
              g.beginFill(0x1b1b1b);
              g.drawRect(0, 0, 360, 12);
              g.endFill();
            }}
          />
          <Graphics
            x={0}
            y={0}
            draw={(g) => {
              g.clear();
              g.beginFill(barColor);
              g.drawRect(0, 0, percentage, 12);
              g.endFill();
            }}
          />
          <Text
            text={`${
              hero.extras.availableHeals === 0
                ? "You have to wait before you can draw holy water from the magic fountain again"
                : "You can draw holy healing water from the magical fountain located in the middle of the temple to heal your wounds"
            }`}
            x={0}
            y={50}
            style={
              new TextStyle({
                align: "left",
                fontFamily: "MedievalSharp",
                fontSize: 20,
                letterSpacing: 1,
                wordWrapWidth: 360,
                wordWrap: true,
                fill: ["#ffffff"],
              })
            }
          />
        </Container>
        {hero.extras.healRenewDate && (
          <Text
            anchor={0.5}
            x={rectWidth / 2}
            y={420}
            text={timeRemaining}
            style={
              new TextStyle({
                align: "center",
                fontFamily: "MedievalSharp",
                fontSize: 22,
                letterSpacing: 1,
                fill: ["#ffffff"],
              })
            }
          />
        )}
        <Sprite
          image={healbtn}
          width={150}
          height={150}
          anchor={0.5}
          x={rectWidth / 2}
          y={480}
          cursor={"pointer"}
          interactive={true}
          onclick={handleTempleHealRequest}
        />
        <Text
          text={`${hero.extras.availableHeals}/2`}
          anchor={0.5}
          x={rectWidth / 2}
          y={530}
          style={
            new TextStyle({
              align: "center",
              fontFamily: "MedievalSharp",
              fontSize: 20,
              letterSpacing: 1,
              fill: ["#ffffff"],
            })
          }
        />
      </Container>
    </Container>
  );
}
const mapStateToProps = ({ game }: any) => ({ game });

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateHero: (data: any) => dispatch(setHero(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Temple);
