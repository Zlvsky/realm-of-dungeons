import { useState } from "react";
import { Container, Text, TilingSprite } from "@pixi/react";

import BgPattern from "../../../assets/images/dark_wall.png"; 
import { TextStyle } from "pixi.js";
import trainersData from "./data/trainersData";
import SingleTrainer from "./components/SingleTrainer";
import HeroStats from "./components/HeroStats";
import TrainerPage from "../trainer-page/TrainerPage";

function Trainers() {
    const [currentTrainer, setCurrentTrainer] = useState("");

    if (currentTrainer.length > 0) return <TrainerPage currentTrainer={currentTrainer} />;

    return (
      <Container position={[0, 2]}>
        <TilingSprite
          image={BgPattern}
          width={1315}
          height={935}
          tilePosition={{ x: 0, y: 0 }}
        />
        <Text
          text={"Trainers"}
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
        <Container position={[133, 220]}>
          {trainersData.map((merchant, index) => (
            <SingleTrainer
              key={index}
              position={[280 * index, 0]}
              name={merchant.name}
              image={merchant.image}
              setCurrentTrainer={setCurrentTrainer}
            />
          ))}
        </Container>
        <HeroStats />
      </Container>
    );
}

export default Trainers;