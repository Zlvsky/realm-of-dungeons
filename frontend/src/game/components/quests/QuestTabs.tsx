import { Container, Text } from "@pixi/react";
import { TextStyle } from 'pixi.js';

function QuestTabs({ selectedQuest, setSelectedQuest }: any) {
  const questsNames = ["QUEST 1", "QUEST 2", "QUEST 3"];
  return (
    <Container position={[0, 80]}>
        {questsNames.map((el, index) => {
            return (
              <Container x={220 + index * 252} y={72} key={index}>
                <Text
                  x={5}
                  y={0}
                  text={el}
                  interactive={true}
                  cursor="pointer"
                  style={
                    new TextStyle({
                      align: "center",
                      fontFamily: "MedievalSharp",
                      letterSpacing: 1,
                      fontSize: 24,
                      fill: selectedQuest === index ? "#8F2424" : "#BCBCBC",
                    })
                  }
                  onpointerdown={() => setSelectedQuest(index)}
                />
              </Container>
            );
        })}
    </Container>
  );
}

export default QuestTabs;