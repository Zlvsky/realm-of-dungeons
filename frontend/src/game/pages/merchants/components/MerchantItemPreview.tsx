import { Container, Graphics, Sprite, Text } from "@pixi/react";
import { TextStyle } from "pixi.js";
import goldIcon from "../../../../assets/images/icons/gui/gold-icon.png";
import ActionButton from "../../../components/items/item-preview/components/ActionButton";
import { IItem } from "../../../../interfaces/MainInterface";
import { useCallback } from "react";

interface IItemPreview {
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

function MerchantItemPreview({
  itemData,
  action,
  value,
  handleAction,
}: IItemPreview) {
  let boxHeight = 180;
  if (value !== undefined) boxHeight = 180;
  const boxWidth = 485;

  const ItemImage = () => {
    return (
      <Sprite
        image={itemData.image}
        width={80}
        height={80}
        position={[0, 0]}
      />
    );
  };

  const ItemName = () => {
    return (
      <Text
        text={itemData.name}
        x={100}
        y={0}
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
          x={100}
          y={55}
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
          x={100}
          y={30}
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
            x={100}
            y={80 + index * 25}
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

  const ItemRequiredLevel = () => {
    const requiredLevel = itemData?.requiredLevel;
    if (!requiredLevel) return null;
    return (
      <Text
        text={`Required level: ${requiredLevel}`}
        x={0}
        y={130}
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

    return (
      <Container position={[320, 120]}>
        <Sprite
          image={goldIcon}
          width={40}
          height={40}
          position={[0,0]}
        />
        <Text
          text={`Price: ${value}`}
          x={50}
          y={10}
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
    <Container position={[287, 60]}>
      <Box width={boxWidth} height={boxHeight} />
      <Container position={[10, 10]}>
        <ItemImage />
        <ItemName />
        <ItemValues />
        <ItemStats />
        <ItemRequiredLevel />
        <ItemPrice />
        <Container position={[0, 350]}>
          <ActionButton
            action={action}
            handleAction={handleAction}
            boxWidth={boxWidth}
            boxHeight={boxHeight}
          />
        </Container>
      </Container>
    </Container>
  );
}

export default MerchantItemPreview;
