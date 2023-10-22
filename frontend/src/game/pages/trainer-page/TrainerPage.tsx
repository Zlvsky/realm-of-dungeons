import { useCallback, useState } from "react";
import trainersData from "../trainers/data/trainersData";
import { useDispatch, useSelector } from "react-redux";
import { getHero, setHero } from "../../../redux/reducers/gameSlice";
import { Container, Graphics, Sprite, Text } from "@pixi/react";
import { TextStyle } from "pixi.js";
import SpecificProgressBar from "./components/SpecificProgressBar";
import TrainerAction from "./components/TrainerAction";

interface ITrainerPage {
  currentTrainer: string;
}

const canvasWidth = 1316;
const canvasHeight = 937;
const rectWidth = 550;
const rectHeight = 600;

function TrainerPage({ currentTrainer }: ITrainerPage) {
    const [trainerData] = useState(
      trainersData.find((el) => el.name === currentTrainer)
    );

    const hero: any = useSelector(getHero)!;

    const startX = (canvasWidth - rectWidth) / 2;
    const startY = (canvasHeight - rectHeight) / 2;

    const trainerFrame = useCallback((g: any) => {
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

    return (
      <Container position={[0, 2]}>
        <Sprite image={trainerData?.background} width={1316} height={935} />
        <Container position={[startX, startY]}>
          <Graphics draw={trainerFrame} zIndex={10} />
          <Text
            text={trainerData?.name}
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
          <Container position={[170, 90]}>
            <Sprite
              image={trainerData?.image}
              position={[0, 0]}
              width={210}
              height={260}
            />
            <Graphics
              x={0}
              y={0}
              draw={(g) => {
                g.clear();
                g.lineStyle(2, 0x656565);
                g.drawRect(0, 0, 210, 260);
                g.endFill();
              }}
            />
          </Container>
          <SpecificProgressBar currentTrainer={currentTrainer} hero={hero} />
          <TrainerAction currentTrainer={currentTrainer} />
        </Container>
      </Container>
    );
}

export default TrainerPage;