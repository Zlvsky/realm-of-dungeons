import { Container } from '@pixi/react';
import HoveredLabel from '../../../../components/ui/HoveredLabel';
import ExclamationMark from '../../../../components/ui/ExclamationMark';

function NpcLabels({ setCurrentNpc }: any) {
    return (
      <Container position={[0, 0]} interactive>
        <HoveredLabel
          x={80}
          y={280}
          hitArea={[-130, -100, 350, 270]}
          text="Traveller"
          onclick={() => setCurrentNpc("traveller")}
        />
        <HoveredLabel
          x={930}
          y={200}
          hitArea={[-50, 0, 200, 270]}
          text="Trophy Collector"
          onclick={() => setCurrentNpc("trophy")}
        />
        <ExclamationMark position={[135, 170]} />
        <ExclamationMark position={[1025, 90]} />
      </Container>
    );
}

export default NpcLabels;