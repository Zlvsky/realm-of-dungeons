import React, { useState, useCallback } from "react";
import { Container, Sprite, Graphics, Text } from "@pixi/react";
import { connect } from "react-redux";

import templebg from "../../../assets/images/game-world/temple.png";
import healbtn from "../../../assets/images/healbtn.png";
import { TextStyle } from "pixi.js";

const canvasWidth = 1316;
const canvasHeight = 937;
const rectWidth = 500;
const rectHeight = 560;


function Temple({ game }: any) {
  const hero = game.hero;
  const startX = (canvasWidth - rectWidth) / 2;
  const startY = (canvasHeight - rectHeight) / 2;
   const percentage = Math.floor(
     (hero.heroValues.currentHealth / hero.heroValues.health) * 360
   );
   const barColor = 0x932424;


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

  const handleTempleHealRequest = () => {

  }

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
          text={`${hero.heroValues.currentHealth}/${hero.heroValues.health}`}
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
            text={`You can draw holy healing water from the magical fountain located in the middle of the temple to heal your wounds`}
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

export default connect(mapStateToProps)(Temple);
