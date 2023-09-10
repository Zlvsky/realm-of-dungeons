import { Container } from "@pixi/react";
import { connect } from "react-redux";
import SelectQuest from "./components/SelectQuest";
import QuestProgress from "./components/QuestProgress";
import QuestBattle from "./components/quest-battle/QuestBattle";

function Quests({ game }: any) {
  const hero = game.hero;

  if (hero?.activeQuest.quest?.battleStarted)
    return <QuestBattle hero={hero} />;

  return (
    <Container position={[0, 2]}>
      {hero?.activeQuest.quest === null ||
      hero?.activeQuest.timeStarted === null ? (
        <SelectQuest questsData={hero.availableQuests} />
      ) : (
        <QuestProgress
          activeQuest={hero.activeQuest}
        />
      )}
    </Container>
  );
}
const mapStateToProps = ({ game }: any) => ({ game });

export default connect(mapStateToProps)(Quests);  