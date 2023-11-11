import { useState, useEffect } from "react";
import { Container, Sprite, Text } from "@pixi/react";
import { TextStyle } from "pixi.js";

import fightbtn from "../../../../assets/images/fightbtn.png";
import secondsRemaining from "../../../../utils/calculations/secondsRemaining";
import secondsToTimeHours from "../../../../utils/parsing-data/secondsToTimeHours";
import displayError from "../../../../utils/notifications/errors";
import { useDispatch } from "react-redux";
import { setHero } from "../../../../redux/reducers/gameSlice";
import fetchHero from "../../../../utils/fetchers/fetchHero";
import { startDungeonBattleRequest } from "../../../../client/appClient";

function DungeonButton({ hero, dungeon }: any ) {
    const [timeRemaining, setTimeRemaining] = useState<any>(null);

    const dispatch = useDispatch();

    const updateHero = (data: any) => {
      dispatch(setHero(data));
    };

    function calculateRemainingTime() {
      return new Promise<void>((resolve) => {
        const checkTimeRemaining = () => {
          const secondsLeft = secondsRemaining(dungeon.dungeonRenewDate!);
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

    const handleStartDungeonBattle = async () => {
      const response = await startDungeonBattleRequest();
      if (response.status !== 200) return displayError(dispatch, response);
      fetchHero(updateHero);
    }

    useEffect(() => {
      if (dungeon.dungeonRenewDate) calculateRemainingTime();
    }, [hero]);

    return (
      <Container position={[0, 820]}>
        {dungeon.dungeonRenewDate && (
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
          image={fightbtn}
          width={150}
          height={150}
          anchor={0.5}
          x={1316 / 2}
          y={50}
          cursor={"pointer"}
          interactive={true}
          onclick={handleStartDungeonBattle}
        />
      </Container>
    );
}

export default DungeonButton;