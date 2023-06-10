import React, { useState, useEffect, useContext } from 'react';
import { Stage, Container, Sprite, Text, Graphics } from "@pixi/react";
import { TextStyle } from 'pixi.js';

function HeroInfo({ hero }: any) {
    const levelPercentage = Math.floor(((hero.progression.experience - hero.progression.previousLevelExperience) / (hero.progression.levelExperience - hero.progression.previousLevelExperience)) * 100);
    return (
      <Container position={[120, 0]}>
        <Sprite
          image={hero?.avatar}
          position={[0, 0]}
          width={250}
          height={250}
        />
        <Container position={[0, 250]}>
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
              g.drawRect(0, 0, levelPercentage, 38);
              g.endFill();
            }}
            interactive={true}
          />
          <Text
            text={`Level ${hero.progression.level}`}
            x={90}
            y={8}
            style={
              new TextStyle({
                align: "center",
                fontFamily: "sans-serif",
                fontWeight: "200",
                fontSize: 24,
                fill: ["#ffffff"],
              })
            }
          />
        </Container>
        <Container position={[0, 310]}>
          <Text
            text={`Hit points: ${hero.heroValues.health}`}
            x={0}
            y={0}
            style={
              new TextStyle({
                align: "center",
                fontFamily: "sans-serif",
                fontWeight: "200",
                fontSize: 20,
                fill: ["#ffffff"],
              })
            }
          />
          <Text
            text={`Damage: ${hero.heroValuesWithItems.damage}`}
            x={0}
            y={25}
            style={
              new TextStyle({
                align: "center",
                fontFamily: "sans-serif",
                fontWeight: "200",
                fontSize: 20,
                fill: ["#ffffff"],
              })
            }
          />
          <Text
            text={`Armor: ${hero.heroValuesWithItems.armor}`}
            x={0}
            y={50}
            style={
              new TextStyle({
                align: "center",
                fontFamily: "sans-serif",
                fontWeight: "200",
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