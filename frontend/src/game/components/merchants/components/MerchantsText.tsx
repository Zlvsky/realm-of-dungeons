import { useState, useEffect } from "react";
import { Text } from "@pixi/react";
import { TextStyle } from "pixi.js";
import secondsRemaining from "../../../../utils/calculations/secondsRemaining";
import secondsToTimeHours from "../../../../utils/parsing-data/secondsToTimeHours";

const canvasWidth = 1316;

const getNextDayMidnight = () => {
  var midnight = new Date();
  midnight.setDate(midnight.getDate() + 1);
  midnight.setHours(0, 0, 0, 0);
  return midnight.toISOString();
};

function MerchantsText() {
  const [timeRemaining, setTimeRemaining] = useState<string | null>(null);

  function calculateRemainingTime() {
    return new Promise<void>((resolve) => {
      const checkTimeRemaining = () => {
        const secondsLeft = secondsRemaining(getNextDayMidnight());
        if (secondsLeft < 0) {
          setTimeRemaining("00:00:00");
          resolve();
        } else {
          setTimeRemaining(secondsToTimeHours(secondsLeft));
          setTimeout(checkTimeRemaining, 1000);
        }
      };
      checkTimeRemaining();
    });
  }

  useEffect(() => {
    calculateRemainingTime();
  }, []);

  return (
    <>
      <Text
        text={"Merchants"}
        anchor={0.5}
        x={canvasWidth / 2}
        y={100}
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
      <Text
        text={"Goods will be refreshed in: " + timeRemaining}
        anchor={0.5}
        x={canvasWidth / 2}
        y={140}
        style={
          new TextStyle({
            align: "center",
            fontFamily: "MedievalSharp",
            fontSize: 24,
            letterSpacing: 1,
            fill: ["#D1D1D1"],
          })
        }
      />
    </>
  );
}

export default MerchantsText;
