import React from "react";
import { Container } from "@pixi/react";
import { connect } from "react-redux";
import SelectQuest from "./components/SelectQuest";
import QuestProgress from "./components/QuestProgress";

function Quests({ game }: any) {
  const hero = game.hero;

  return (
    <Container position={[0, 2]}>
      {hero?.activeQuest.quest === null || hero?.activeQuest.timeStarted === null ? (
        <SelectQuest questsData={hero.availableQuests} />
      ) : (
        <QuestProgress />
      )}
    </Container>
  );
}
const mapStateToProps = ({ game }: any) => ({ game });

export default connect(mapStateToProps)(Quests);