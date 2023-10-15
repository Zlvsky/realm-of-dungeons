import { Container, Sprite, Text } from "@pixi/react";
import { TextStyle } from "pixi.js";
import ArrowIcon from "../../../../assets/images/arrow_white.png";
import { realmsData } from "../data/realmsData";

function Destinations({ availableRealms, realm, setRealm }: any) {
  return (
    <Container position={[0, 40]}>
      {availableRealms.map((el: string, index: number) => {
        return (
          <Container x={0} y={100 * index} key={index}>
            <Text
              x={110}
              y={0}
              anchor={[0.5, 0]}
              text={el}
              interactive={true}
              cursor="pointer"
              style={
                new TextStyle({
                  align: "center",
                  fontFamily: "MedievalSharp",
                  letterSpacing: 1,
                  fontSize: 24,
                  fill: ["#BCBCBC"],
                })
              }
              onclick={() => setRealm(realmsData(el))}
            />
            {realm?.value === el && (
              <Sprite
                image={ArrowIcon}
                position={[110, 40]}
                anchor={[0.5, 0]}
                height={25}
                width={20}
              />
            )}
          </Container>
        );
      })}
    </Container>
  );
}

export default Destinations;
