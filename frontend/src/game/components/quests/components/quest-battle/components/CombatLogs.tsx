import { useState, useCallback, useEffect } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import { TextStyle } from "pixi.js";

interface ICombatLogs {
  logs: string[];
}

const mockedLogs = [
  "Dark mage attacks you with bite for 1!",
  "You attack dark mage with your axe for 5",
  "Dark mage attacks you with bite for 4!",
  "You sling a flaming ball at withered for 2",
  "Fireball deals an extra 5 damage",
  "Dark mage attacks you with slash for 6!",
  "You sling a flaming ball at dark mage for 18",
  "Dark mage attacks you with slash for 5! Fireball deals an extra 5 damage",
  "You've defeated the dark mage.",
  "Battle ended!!!",
];

const LogText = ({
  log,
  index,
  height,
  filteredLogs,
  setFilteredLogs,
}: any) => {
  const measuredRef = useCallback(
    (node: any) => {
      if (node !== null) {
        setFilteredLogs((prevArray: any) =>
          prevArray.map((item: any, i: number) =>
            i === index ? { ...item, height: node.height } : item
          )
        );
      }
    },
    [log, height]
  );
  let baseLogSpacing = 19;
  let logSpacing = 19;
  if (index !== 0) {
    const splicedArray = [...filteredLogs].splice(0, index);
    const sumOfHeights = splicedArray.reduce(
      (sum: number, item: any) => sum + (item.height + baseLogSpacing),
      0
    );
    logSpacing = sumOfHeights + baseLogSpacing;
  }

  return (
    <Text
      ref={measuredRef}
      text={log}
      y={logSpacing}
      style={
        new TextStyle({
          wordWrap: true,
          wordWrapWidth: 300,
          align: "left",
          fontFamily: "Almendra",
          fontWeight: "200",
          fontSize: 16,
          fill: ["#ffffff"],
        })
      }
    />
  );
};

function CombatLogs({ logs }: ICombatLogs) {
  const [filteredLogs, setFilteredLogs] = useState<any[]>([]);

  useEffect(() => {
    const logsWithHeight: any = logs.map((el: string) => ({
      value: el,
      height: 19,
    }));
    setFilteredLogs(logsWithHeight.slice(-10));
  }, [logs]);

  return (
    <Container position={[880, 100]}>
      <Graphics
        x={0}
        y={0}
        draw={(g) => {
          g.lineStyle(1, 0x656565);
          g.beginFill(0x2c2c2c);
          g.drawRect(0, 0, 420, 650);
          g.endFill();
        }}
        interactive={true}
      />
      <Container position={[30, 30]}>
        {filteredLogs.map((log, index) => {
          return (
            <LogText
              key={index + log}
              log={log.value}
              index={index}
              filteredLogs={filteredLogs}
              setFilteredLogs={setFilteredLogs}
              height={log.height}
            />
          );
        })}
      </Container>
    </Container>
  );
}

export default CombatLogs;
