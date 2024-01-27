import { Container } from '@pixi/react-animated';
import HoveredLabel from '../../../components/ui/HoveredLabel';
import { useDispatch } from 'react-redux';
import { setCurrentStage } from '../../../../redux/reducers/gameSlice';

function BuildingLabels() {
    const dispatch = useDispatch();

    const changeStage = (stage: string) => {
      dispatch(setCurrentStage(stage));
    };



    return (
      <Container position={[0, 0]} interactive>
        <HoveredLabel
          x={950}
          y={200}
          hitArea={[-130, -50, 350, 270]}
          text="Tavern"
          onclick={() => changeStage("quests")}
        />
        <HoveredLabel
          x={570}
          y={170}
          hitArea={[-50, -100, 350, 270]}
          text="Trade centre"
          onclick={() => changeStage("merchants")}
        />
        <HoveredLabel
          x={370}
          y={470}
          hitArea={[-130, -50, 350, 270]}
          text="Trainers"
          onclick={() => changeStage("trainers")}
        />
        <HoveredLabel
          x={975}
          y={570}
          hitArea={[-130, -50, 350, 270]}
          text="Elder"
          onclick={() => changeStage("portals")}
        />
      </Container>
    );
}

export default BuildingLabels;