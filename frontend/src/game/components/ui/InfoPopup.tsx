import { Container, Graphics, Text } from "@pixi/react";
import { TextStyle } from "pixi.js";
import { useCallback } from "react";

interface IInfoPopup {
    position: [number, number];
    show: boolean;
    width?: number;
    height?: number;
    children: React.ReactNode;
}

export const InfoPopupTextStyle = (color: string = "#ffffff", wrapWidth: number = 240) => {
  return new TextStyle({
    wordWrap: true,
    wordWrapWidth: wrapWidth,
    align: "left",
    fontFamily: "Almendra",
    fontWeight: "200",
    fontSize: 18,
    fill: color,
  });
};

function InfoPopup({ position, show, width=240, height=130, children }: IInfoPopup) {

    const popupFrame = useCallback((g: any) => {
      g.clear();

      g.beginFill(0x2c2c2c, 0.9);
      g.lineStyle(1, 0x656565);

      g.moveTo(0, 0);
      g.lineTo(width, 0);
      g.lineTo(width, -height);
      g.lineTo(0, -height);
      g.lineTo(0, 0);

      g.endFill();
    }, []);

    if (!show) return null;

    return (
      <Container position={position}>
        <Graphics draw={popupFrame} />
        <Container position={[5, -height + 5]}>{children}</Container>
      </Container>
    );
}

export default InfoPopup;