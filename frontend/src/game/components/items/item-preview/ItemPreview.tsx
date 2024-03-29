import { Container, Graphics, Sprite, Text } from "@pixi/react";
import { TextStyle } from "pixi.js";
import goldIcon from "../../../../assets/images/icons/gui/gold-icon.png";
import ActionButton from "./components/ActionButton";
import { IItem } from "../../../../interfaces/MainInterface";
import { useCallback } from "react";

interface IItemPreview {
  position: [number, number];
  itemData: IItem;
  action?: "BUY" | "SELL";
  value?: number;
  handleAction?: any;
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const Box = ({ width, height }: any) => {
  const boxFrame = useCallback((g: any) => {
    g.clear();
    g.lineStyle(2, 0x656565);
    g.beginFill(0x2c2c2c, 0.3);
    g.drawRect(0, 0, width, height);
    g.endFill();
  }, []);

  return <Graphics x={0} y={0} draw={boxFrame} />;
};

function ItemPreview({
  position,
  itemData,
  action,
  value,
  handleAction,
}: IItemPreview) {
  let boxHeight = 340;
  if (value !== undefined) boxHeight = 390;
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
      if (!itemData?.armor === undefined && itemData.damage === undefined)
        return null;
      let valueText;
      if (itemData?.armor !== undefined)
        valueText = `Defense: ${itemData.armor}`;
      if (itemData?.damage !== undefined)
        valueText = `Damage: ${itemData.damage}`;
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
    };

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
    const statsLength = itemData?.statistics
      ? Object.keys(itemData.statistics).length
      : 0;
    const yPosition = 200 + statsLength * 25;
    return (
      <Text
        text={itemData?.description}
        x={20}
        y={yPosition}
        style={
          new TextStyle({
            align: "left",
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
  };

  const ItemRequiredLevel = () => {
    const requiredLevel = itemData?.requiredLevel;
    if (!requiredLevel) return null;
    return (
      <Text
        text={`Required level: ${requiredLevel}`}
        x={boxWidth / 2}
        y={300}
        anchor={[0.5, 0]}
        style={
          new TextStyle({
            align: "center",
            fontFamily: "Almendra",
            fontSize: 18,
            fill: ["#ffffff"],
            letterSpacing: 0.5,
            wordWrap: true,
            wordWrapWidth: boxWidth - 20,
          })
        }
      />
    );
  };

  const ItemPrice = () => {
    if (value === undefined) return null;

    const priceGraphics = useCallback((g: any) => {
      g.clear();
      g.lineStyle(1, 0x656565);
      g.lineTo(boxWidth - 40, 0);
      g.endFill();
    }, []);

    return (
      <Container position={[20, 0]}>
        <Graphics x={0} y={330} draw={priceGraphics} interactive={true} />
        <Sprite
          image={goldIcon}
          width={40}
          height={40}
          position={[0, boxHeight - 50]}
        />
        <Text
          text={`Price: ${value}`}
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
      <ItemRequiredLevel />
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
