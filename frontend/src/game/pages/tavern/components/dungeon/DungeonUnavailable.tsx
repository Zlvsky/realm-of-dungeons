import { Text } from '@pixi/react';
import { TextStyle } from 'pixi.js';

const halfWidth = 1180 / 2 - 60;

const getDungeonInfo = (realm: string) => {
  switch (realm) {
    case "CAVERNS":
      return "Caverns dungeon is unlocked by reaching 5 level";
      
    case "CRYPT":
      return "Crypt dungeon is unlocked by reaching 15 level";
  }
};

function DungeonUnavailable({ realm }: any) {
    const dungeonInfo = getDungeonInfo(realm);

    return (
      <>
        <Text
          x={halfWidth}
          y={170}
          anchor={[0.5, 0]}
          text={dungeonInfo}
          style={
            new TextStyle({
              align: "center",
              fontFamily: "Almendra",
              fontSize: 29,
              fill: ["#dfdfdf"],
            })
          }
        />
        <Text
          x={50}
          y={220}
          text={"The path ahead to unlock this trove of treasures may require yet greater strength.\nReturn when your prowess matches the challenges that await."}
          style={
            new TextStyle({
              align: "left",
              fontFamily: "Almendra",
              fontSize: 24,
              fill: ["#BCBCBC"],
            })
          }
        />
      </>
    );
}

export default DungeonUnavailable;