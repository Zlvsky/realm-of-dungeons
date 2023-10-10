import { Container, Text } from '@pixi/react';
import { TextStyle } from 'pixi.js';

function RealmInfo({ destination }: any) {
    return (
      <Container position={[220, 0]}>
        <Text
          text={`Destination: ${destination.name}`}
          x={0}
          y={40}
          style={
            new TextStyle({
              align: "left",
              fontFamily: "Almendra",
              fontSize: 30,
              letterSpacing: 1,
              fill: ["#ffffff"],
            })
          }
        />
        <Text
          text={`Monsters level:`}
          x={0}
          y={100}
          style={
            new TextStyle({
              align: "left",
              fontFamily: "MedievalSharp",
              fontSize: 20,
              letterSpacing: 1,
              fill: ["#ffffff"],
            })
          }
        />
        <Text
          text={destination.monsters}
          x={160}
          y={100}
          style={
            new TextStyle({
              align: "left",
              fontFamily: "MedievalSharp",
              fontSize: 20,
              letterSpacing: 1,
              fill: ["#BC330C"],
            })
          }
        />
        <Text
          text={destination.description}
          x={0}
          y={150}
          style={
            new TextStyle({
              align: "left",
              fontFamily: "MedievalSharp",
              fontSize: 20,
              letterSpacing: 1,
              wordWrapWidth: 360,
              wordWrap: true,
              fill: ["#ffffff"],
            })
          }
        />
      </Container>
    );
}

export default RealmInfo;