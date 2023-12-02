import { Container, Graphics, Sprite, Text } from "@pixi/react";
import { TextStyle } from "pixi.js";
import dealBtn from "../../../../assets/images/dealbtn.png";
import { useDispatch } from "react-redux";
import { setCurrentStage } from "../../../../redux/reducers/gameSlice";

interface ISingleMerchant {
  position: [number, number];
  name: string;
  image: string;
  setCurrentMerchant: (merchant: string) => void;
}

const boxHeight = 260; 
const boxWidth = 210; 

function SingleMerchant({
  position,
  name,
  image,
  setCurrentMerchant,
}: ISingleMerchant) {

  const dispatch = useDispatch();
  const changeStage = (stage: string) => {
    dispatch(setCurrentStage(stage));
  };

  const handleNavigateToMerchang = () => {
    changeStage("merchant_shop");
    setCurrentMerchant(name);
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
        image={dealBtn}
        width={150}
        height={45}
        anchor={0.5}
        x={boxWidth / 2}
        y={boxHeight + 40}
        cursor={"pointer"}
        interactive={true}
        onclick={handleNavigateToMerchang}
      />
    </Container>
  );
}

export default SingleMerchant;