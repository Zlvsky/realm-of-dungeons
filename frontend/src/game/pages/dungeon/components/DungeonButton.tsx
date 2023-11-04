import { useState, useEffect } from "react";
import { Container, Sprite, Text } from "@pixi/react";
import { TextStyle } from "pixi.js";

import acceptbtn from "../../../../assets/images/acceptbtn.png";
import secondsRemaining from "../../../../utils/calculations/secondsRemaining";
import secondsToTimeHours from "../../../../utils/parsing-data/secondsToTimeHours";

function DungeonButton({ hero, dungeons }: any ) {

    const [timeRemaining, setTimeRemaining] = useState<any>(null);

    function calculateRemainingTime() {
      return new Promise<void>((resolve) => {
        const checkTimeRemaining = () => {
          const secondsLeft = secondsRemaining(hero.extras.healRenewDate!);
          if (secondsLeft < 0) {
            setTimeRemaining("00:00:00");
            resolve();
          } else {
            setTimeRemaining(secondsToTimeHours(secondsLeft));
            setTimeout(checkTimeRemaining, 1000); // check again in 100ms
          }
        };
        checkTimeRemaining();
      });
    }

    useEffect(() => {
      if (hero.extras.healRenewDate) calculateRemainingTime();
    }, [hero]);

    return (
      <Container position={[0, 820]}>
        {dungeons.dungeonRenewDate && (
          <Text
            anchor={0.5}
            x={1316 / 2}
            y={0}
            text={timeRemaining}
            style={
              new TextStyle({
                align: "center",
                fontFamily: "MedievalSharp",
                fontSize: 22,
                letterSpacing: 1,
                fill: ["#ffffff"],
              })
            }
          />
        )}
        <Sprite
          image={acceptbtn}
          width={150}
          height={150}
          anchor={0.5}
          x={1316 / 2}
          y={50}
          cursor={"pointer"}
          interactive={true}
          onclick={() => {}}
        />
      </Container>
    );
}

export default DungeonButton;