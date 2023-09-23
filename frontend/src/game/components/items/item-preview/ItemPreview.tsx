import { Container, Graphics, Sprite, Text } from "@pixi/react";
import { TextStyle } from "pixi.js";
import goldIcon from "../../../../assets/images/icons/gui/gold-icon.png";
import ActionButton from "./components/ActionButton";
import { IItem } from "../../../../interfaces/MainInterface";

interface IItemPreview {
  position: [number, number];
  itemData: IItem;
  action?: "BUY" | "SELL";
  hideValue?: boolean
  handleAction?: any;
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const Box = ({ width, height }: any) => {
    return (
      <Graphics
        x={0}
        y={0}
        draw={(g) => {
          g.lineStyle(2, 0x656565);
          g.beginFill(0x2c2c2c, 0.3);
          g.drawRect(0, 0, width, height);
          g.endFill();
        }}
      />
    );
}



function ItemPreview({
  position,
  itemData,
  action,
  hideValue,
  handleAction,
}: IItemPreview) {
  let boxHeight = 340;
  if (itemData.value && !hideValue) boxHeight = 390;
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
            fontSize: 23,
            fontWeight: "400",
            fill: ["#ffffff"],
            letterSpacing: 0.5,
          })
        }
      />
    );
  };

  const ItemValues = () => {

    const ItemValue = () => {
      if (!itemData?.defense === undefined || itemData.damage === undefined) return null;
      let valueText;
      if (itemData?.defense !== undefined)
        valueText = `Defense: ${itemData.defense}`;
      if (itemData?.damage !== undefined) valueText = `Damage: ${itemData.damage}`;
      return (
        <Text
          text={valueText}
          x={20}
          y={175}
          style={
            new TextStyle({
              align: "center",
              fontFamily: "Almendra",
              fontSize: 20,
              fontWeight: "400",
              fill: ["#ffffff"],
              letterSpacing: 0.5,
            })
          }
        />
      );
    }
    
    return (
      <>
        <Text
          text={`Type: ${itemData.type}`}
          x={20}
          y={150}
          style={
            new TextStyle({
              align: "center",
              fontFamily: "Almendra",
              fontSize: 20,
              fontWeight: "400",
              fill: ["#ffffff"],
              letterSpacing: 0.5,
            })
          }
        />
        <ItemValue />
      </>
    );
  };

  const ItemStats = () => {
    if (!itemData.statistics || Object.keys(itemData.statistics).length === 0)
      return null;
    return (
      <>
        {Object.entries(itemData.statistics).map((statistic, index) => (
          <Text
            key={index}
            text={capitalizeFirstLetter(statistic[0]) + ": +" + statistic[1]}
            x={20}
            y={200 + index * 25}
            style={
              new TextStyle({
                align: "center",
                fontFamily: "Almendra",
                fontSize: 20,
                fontWeight: "400",
                fill: ["#BC330C"],
                letterSpacing: 0.5,
              })
            }
          />
        ))}
      </>
    );
  };

  const ItemDescription = () => {
    const statsLength = itemData?.statistics ? Object.keys(itemData.statistics).length : 0;
    const yPosition = 200 + statsLength * 25;
    return (
      <Text
        text={itemData?.description}
        x={20}
        y={yPosition}
        style={
          new TextStyle({
            align: "center",
            fontFamily: "Almendra",
            fontSize: 20,
            fontWeight: "100",
            fontStyle: "italic",
            fill: ["#ffffff"],
            letterSpacing: 0.5,
            wordWrap: true,
            wordWrapWidth: boxWidth - 20,
          })
        }
      />
    );
  }

  const ItemPrice = () => {
    if (!itemData.value || hideValue) return null;
    return (
      <Container position={[20, 0]}>
        <Graphics
          x={0}
          y={330}
          draw={(g) => {
            g.clear();
            g.lineStyle(1, 0x656565);
            g.lineTo(boxWidth - 40, 0);
            g.endFill();
          }}
          interactive={true}
        />
        <Sprite
          image={goldIcon}
          width={40}
          height={40}
          position={[0, boxHeight - 50]}
        />
        <Text
          text={`Price: ${itemData.value}`}
          x={50}
          y={boxHeight - 40}
          style={
            new TextStyle({
              align: "center",
              fontFamily: "Almendra",
              fontSize: 20,
              fontWeight: "400",
              fill: ["#ffffff"],
              letterSpacing: 0.5,
            })
          }
        />
      </Container>
    );
  };

  return (
    <Container position={position}>
      <Box width={boxWidth} height={boxHeight} />
      <ItemImage />
      <ItemName />
      <ItemValues />
      <ItemStats />
      <ItemDescription />
      <ItemPrice />
      <ActionButton
        action={action}
        handleAction={handleAction}
        boxWidth={boxWidth}
        boxHeight={boxHeight}
      />
    </Container>
  );
}

export default ItemPreview;