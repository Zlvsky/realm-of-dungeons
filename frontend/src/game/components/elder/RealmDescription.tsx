import { Container, Text } from "@pixi/react";
import { TextStyle } from "pixi.js";

function RealmDescription({ realm }: any) {
  return (
    <Container position={[0, 300]}>
      <Text
        text={`Monsters level:`}
        x={0}
        y={100}
        style={
          new TextStyle({
            align: "left",
            fontFamily: "Almendra",
            fontSize: 24,
            letterSpacing: 1,
            fill: ["#BCBCBC"],
          })
        }
      />
      <Text
        text={realm.monsters}
        x={170}
        y={100}
        style={
          new TextStyle({
            align: "left",
            fontFamily: "MedievalSharp",
            fontSize: 24,
            letterSpacing: 1,
            fill: ["#BC330C"],
          })
        }
      />
      <Text
        text={realm.description}
        x={0}
        y={150}
        style={
          new TextStyle({
            align: "left",
            fontFamily: "Almendra",
            fontSize: 24,
            letterSpacing: 1,
            wordWrapWidth: 1000,
            wordWrap: true,
            fill: ["#BCBCBC"],
          })
        }
      />
    </Container>
  );
}

export default RealmDescription;
