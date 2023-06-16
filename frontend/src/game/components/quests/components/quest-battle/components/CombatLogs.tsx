import { useState, useRef, useEffect } from "react";
import { Container, Graphics, Text } from '@pixi/react';
import { TextStyle } from 'pixi.js';

interface ICombatLogs {
    logs?: string[];
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

const LogText = ({ log, index, previousHeight, setPreviousHeight }: any) => {
  const logRef = useRef<any>();
  const baseLogSpacing = 40;
  useEffect(() => {
    if (logRef.current) {
      if(previousHeight === undefined) setPreviousHeight((prev: any) => [...prev, 0]);
      else setPreviousHeight((prev: any) => [...prev, logRef.current.height]);
    }
    if (logRef.current) console.log(log, logRef.current.height, previousHeight);
  }, [logRef]);
  return (
    <Text
      ref={logRef}
      text={log}
      y={(baseLogSpacing * index) + (previousHeight ? previousHeight : 0)}
      style={
        new TextStyle({
          wordWrap: true,
          wordWrapWidth: 370,
          align: "left",
          fontFamily: "sans-serif",
          fontWeight: "200",
          fontSize: 16,
          fill: ["#ffffff"],
        })
      }
    />
  );
};

function CombatLogs({ logs }: ICombatLogs) {
  const [previousHeight, setPreviousHeight] = useState([]);
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
        {mockedLogs.map((log, index) => {
          return (
            <LogText
              key={index}
              log={log}
              index={index}
              setPreviousHeight={setPreviousHeight}
              previousHeight={previousHeight[index - 1]}
            />
          );
        })}
      </Container>
    </Container>
  );
}

export default CombatLogs;