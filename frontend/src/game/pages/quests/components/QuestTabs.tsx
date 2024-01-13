import { Container, Sprite, Text } from "@pixi/react";
import { TextStyle } from 'pixi.js';
import ArrowIcon from "../../../../assets/images/arrow_white.png";

function QuestTabs({ selectedQuest, setSelectedQuest }: any) {
  const questsNames = ["QUEST 1", "QUEST 2", "QUEST 3"];
  return (
    <Container position={[0, 120]}>
        {questsNames.map((el, index) => {
            return (
              <Container x={350 + index * 252} y={72} key={index}>
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
                      fill: ["#BCBCBC"],
                    })
                  }
                  onpointerdown={() => setSelectedQuest(index)}
                />
                {selectedQuest === index && (
                  <Sprite image={ArrowIcon} position={[40, 30]} />
                )}
              </Container>
            );
        })}
    </Container>
  );
}

export default QuestTabs;