import { Container, Text } from '@pixi/react';
import { TextStyle } from 'pixi.js';
import { getDungeonTitle } from './helpers/getDungeonTitle';

function DungeonTitle({ dungeon, realm }: any) {
  const dungeonTitle = getDungeonTitle(dungeon, realm);

  return (
    <Container position={[(1180 / 2) -60, 130]}>
      <Text
        text={dungeonTitle}
        anchor={[0.5, 0]}
        style={
          new TextStyle({
            align: "center",
            fontFamily: "Almendra",
            fontSize: 30,
            letterSpacing: 1,
            fill: ["#ffffff"],
          })
        }
      />
    </Container>
  );
}

export default DungeonTitle;