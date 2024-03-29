import { useCallback } from 'react';
import { Container, Graphics, Sprite, Text } from '@pixi/react';
import { TextStyle } from 'pixi.js';
import IconWithText from '../../../components/common/text/IconWithText';
import GoldIcon from "../../../assets/images/icons/gui/gold-icon.png";
import XpIcon from "../../../assets/images/icons/gui/xp.png";
import continuebtn from "../../../assets/images/continuebtn.png";
import { IItem } from '../../../interfaces/MainInterface';

interface IBattleEnd {
  battleWinner: 1 | 2;
  rewards: {
    gold: number;
    xp: number;
    reputation?: number;
    item?: IItem;
  };
  handleBattleEnd: () => void;
}

const canvasWidth = 1316;
const canvasHeight = 937;
const rectWidth = 615;
const rectHeight = 450;

const iconWithTextStyle: any = {
  align: "center",
  fontFamily: "MedievalSharp",
  fontSize: 24,
  fill: "#BCBCBC",
  wordWrap: true,
  wordWrapWidth: 610,
};

function BattleEndPopup({
  battleWinner,
  rewards,
  handleBattleEnd,
}: IBattleEnd) {
  const startX = (canvasWidth - rectWidth) / 2;
  const startY = (canvasHeight - rectHeight) / 2;

  const backgroundFrame = useCallback((g: any) => {
    g.clear();

    g.beginFill(0x1f1f1f, 0.6);

    g.moveTo(0, 0);
    g.lineTo(canvasWidth, 0);
    g.lineTo(canvasWidth, canvasHeight);
    g.lineTo(0, canvasHeight);
    g.lineTo(0, 0);

    g.endFill();
  }, []);

  const questFrame = useCallback((g: any) => {
    g.clear();

    g.beginFill(0x1f1f1f, 1);
    g.lineStyle(8, 0x1f1f1f, 1);

    g.moveTo(0, 0);
    g.lineTo(rectWidth, 0);
    g.lineTo(rectWidth, rectHeight);
    g.lineTo(0, rectHeight);
    g.lineTo(0, 0);

    g.endFill();
  }, []);

  return (
    <Container position={[0, 0]}>
      <Graphics draw={backgroundFrame} zIndex={0} />
      <Container position={[startX, startY]}>
        <Graphics draw={questFrame} zIndex={10} />
        <Text
          text={battleWinner === 1 ? "Victory" : "Defeat"}
          anchor={0.5}
          x={rectWidth / 2}
          y={50}
          style={
            new TextStyle({
              align: "center",
              fontFamily: "Almendra",
              fontSize: 30,
              letterSpacing: 4,
              fill: ["#BC330C"],
            })
          }
        />
        <Text
          text={
            battleWinner === 1
              ? "Congratulations! \n Claim your reward"
              : "You've been defeated \n Heal your wounds and try again next time"
          }
          anchor={0.5}
          x={rectWidth / 2}
          y={120}
          style={
            new TextStyle({
              align: "center",
              fontFamily: "Almendra",
              fontSize: 20,
              letterSpacing: 1,
              lineHeight: 30,
              leading: 3,
              fill: ["#ebebeb"],
            })
          }
        />
        {battleWinner === 1 ? (
          <>
            <IconWithText
              text={rewards.gold}
              image={GoldIcon}
              position={[330, 230]}
              textStyle={iconWithTextStyle}
            />
            <IconWithText
              text={rewards.xp}
              image={XpIcon}
              position={[150, 230]}
              textStyle={iconWithTextStyle}
            />
            {rewards.item && (
              <IconWithText
                text={rewards?.item.name}
                image={rewards?.item.image}
                position={[180, 295]}
                imageWidth={60}
                imageHeight={60}
                imageY={-10}
                textStyle={iconWithTextStyle}
              />
            )}
            {rewards.reputation && (
              <Text
                text={`${rewards.reputation} reputation gained`}
                position={[rectWidth / 2, 190]}
                anchor={[0.5, 0]}
                style={new TextStyle(iconWithTextStyle)}
              />
            )}
          </>
        ) : (
          <>
            {rewards.reputation && (
              <Text
                text={`${rewards.reputation * 3} reputation lost`}
                position={[rectWidth / 2, 190]}
                anchor={[0.5, 0]}
                style={new TextStyle(iconWithTextStyle)}
              />
            )}
          </>
        )}
        <Sprite
          image={continuebtn}
          width={150}
          height={150}
          anchor={0.5}
          x={rectWidth / 2}
          y={380}
          cursor={"pointer"}
          interactive={true}
          onpointerdown={handleBattleEnd}
        />
      </Container>
    </Container>
  );
}

export default BattleEndPopup;