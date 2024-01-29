import { useState } from 'react';
import { Container, Sprite } from '@pixi/react';
import mainmap from "../../../assets/images/game-world/mainmap.jpg";
import BuildingLabels from './components/BuildingLabels';
import ElderNpc from './components/ElderNpc';

function Village({ npc }: any) {
    const [selectedNpc, setSelectedNpc] = useState(npc || "");

    return (
      <Container position={[0, 2]}>
        <Sprite image={mainmap} width={1316} height={935} />

        {selectedNpc === "" && <BuildingLabels setSelectedNpc={setSelectedNpc} />}

        {selectedNpc === "elder" && <ElderNpc setCurrentNpc={setSelectedNpc} />}
      </Container>
    );
}

export default Village;