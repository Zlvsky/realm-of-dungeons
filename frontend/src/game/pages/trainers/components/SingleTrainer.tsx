import { Container, Graphics, Sprite, Text } from "@pixi/react";
import { TextStyle } from "pixi.js";
import enterBtn from "../../../../assets/images/enterbtn.png";

interface ISingleTrainer {
  position: [number, number];
  name: string;
  image: string;
  setCurrentTrainer: (merchant: string) => void;
}

const boxHeight = 260; 
const boxWidth = 210; 

function SingleTrainer({
  position,
  name,
  image,
  setCurrentTrainer,
}: ISingleTrainer) {
  const handleNavigateToTrainer = () => {
    setCurrentTrainer(name);
  };

  return (
    <Container position={position}>
      <Sprite
        image={image}
        position={[0, 0]}
        width={boxWidth}
        height={boxHeight}
      />
      <Graphics
        x={0}
        y={0}
        draw={(g) => {
          g.clear();
          g.lineStyle(2, 0x656565);
          g.drawRect(0, 0, boxWidth, boxHeight);
          g.endFill();
        }}
      />
      <Graphics
        x={0}
        y={boxHeight - 40}
        draw={(g) => {
          g.clear();
          g.beginFill(0x000000, 0.8);
          g.drawRect(0, 0, boxWidth, 40);
          g.endFill();
        }}
      />
      <Text
        text={name}
        anchor={0.5}
        x={boxWidth / 2}
        y={boxHeight - 20}
        style={
          new TextStyle({
            align: "center",
            fontFamily: "MedievalSharp",
            fontSize: 20,
            fill: ["#898989"],
          })
        }
      />
      <Sprite
        image={enterBtn}
        width={150}
        height={150}
        anchor={0.5}
        x={boxWidth / 2}
        y={boxHeight + 40}
        cursor={"pointer"}
        interactive={true}
        onclick={handleNavigateToTrainer}
      />
    </Container>
  );
}

export default SingleTrainer;