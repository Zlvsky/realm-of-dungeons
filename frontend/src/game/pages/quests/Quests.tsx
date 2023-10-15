import { Container } from "@pixi/react";
import { useSelector } from "react-redux";
import SelectQuest from "./components/SelectQuest";
import QuestProgress from "./components/QuestProgress";
import QuestBattle from "./components/quest-battle/QuestBattle";
import { getHero } from "../../../redux/reducers/gameSlice";

function Quests() {
  const hero = useSelector(getHero)!;

  if (hero?.activeQuest.quest?.battleStarted)
    return <QuestBattle hero={hero} />;

  return (
    <Container position={[0, 2]}>
      {hero?.activeQuest.quest === null ||
      hero?.activeQuest.timeStarted === null ? (
        <SelectQuest hero={hero} />
      ) : (
        <QuestProgress
          hero={hero}
        />
      )}
    </Container>
  );
}
export default Quests;