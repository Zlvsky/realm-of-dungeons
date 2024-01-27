import { useState } from "react";
import { Container, Text, TilingSprite } from "@pixi/react";

import BgPattern from "../../../assets/images/dark_wall.png";
import { TextStyle } from "pixi.js";
import CreateGuild from "./components/CreateGuild";


function Guild() {
  return (
    <Container position={[0, 2]}>
      <TilingSprite
        image={BgPattern}
        width={1316}
        height={935}
        tilePosition={{ x: 0, y: 0 }}
      />
      <Text
        text={"Guild"}
        anchor={0.5}
        x={1316 / 2}
        y={100}
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
      <CreateGuild />
    </Container>
  );
}

export default Guild;
