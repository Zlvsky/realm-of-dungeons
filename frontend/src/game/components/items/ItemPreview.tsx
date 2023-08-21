import { Container, Graphics, Sprite, Text } from "@pixi/react";
import { TextStyle } from "pixi.js";

interface IItemPreview {
  position: [number, number];
  itemData: {
    name: string;
    type: string;
    minDamage?: number;
    maxDamage?: number;
    image: string;
    armor?: number;
    statistics: {
      strength?: number;
      condition?: number;
      dexterity?: number;
      wisdom?: number;
      intelligence?: number;
      charisma?: number;
    };
  };
  price?: number;
  action?: "BUY" | "SELL";
}

const Box = ({ width, height }: any) => {
    return (
      <Graphics
        x={0}
        y={0}
        draw={(g) => {
          g.lineStyle(1, 0x656565);
          g.beginFill(0x2c2c2c, 0.3);
          g.drawRect(0, 0, width, height);
          g.endFill();
        }}
      />
    );
}



function ItemPreview({ position, itemData, price, action }: IItemPreview) {
    let boxHeight = 340;
    if (price) boxHeight = 390;
    const boxWidth = 325;

    const ItemImage = () => {
      return (
        <Sprite
          image={itemData.image}
          width={80}
          height={80}
          anchor={0.5}
          position={[boxWidth / 2, 40 + 20]}
        />
      );
    };

    const ItemName = () => {
        return (
          <Text
            text={itemData.name}
            anchor={0.5}
            x={boxWidth / 2}
            y={120}
            style={
              new TextStyle({
                align: "center",
                fontFamily: "Almendra",
                fontSize: 20,
                fontWeight: "400",
                fill: ["#ffffff"],
              })
            }
          />
        );
    }
  
    return (
      <Container position={position}>
        <Box width={boxWidth} height={boxHeight} />
        <ItemImage />
        <ItemName />
      </Container>
    );
}

export default ItemPreview;