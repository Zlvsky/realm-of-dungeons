import { Container, Sprite } from '@pixi/react';
import mainmap from "../../../assets/images/game-world/mainmap.jpg";
import BuildingLabels from './components/BuildingLabels';

const canvasWidth = 1316;
const canvasHeight = 937;
const rectWidth = 500;
const rectHeight = 560;

function Village() {
    return (
      <Container position={[0, 2]}>
        <Sprite image={mainmap} width={1316} height={935} />
        <BuildingLabels />
      </Container>
    );
}

export default Village;