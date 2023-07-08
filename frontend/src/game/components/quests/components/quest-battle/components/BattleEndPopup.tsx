import { useCallback } from 'react';
import { Container, Graphics, Text } from '@pixi/react';
import { TextStyle } from 'pixi.js';
import IconWithText from '../../../../../../components/common/text/IconWithText';
import GoldIcon from "../../../../../../assets/images/icons/gui/gold-icon.png";
import XpIcon from "../../../../../../assets/images/icons/gui/xp.png";

interface IBattleEnd {
  battleWinner: 1 | 2;
  rewards: {
    gold: number;
    xp: number;
    item?: string;
  };
}

const canvasWidth = 1316;
const canvasHeight = 937;
const rectWidth = 615;
const rectHeight = 450;

function BattleEndPopup({ battleWinner, rewards }: IBattleEnd) {
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
                leading: 5,
                fill: ["#ebebeb"],
              })
            }
          />
          <IconWithText
            text={rewards.gold / 100}
            image={GoldIcon}
            position={[330, 230]}
          />
          <IconWithText
            text={rewards.xp}
            image={XpIcon}
            position={[150, 230]}
          />
        </Container>
      </Container>
    );
}

export default BattleEndPopup;