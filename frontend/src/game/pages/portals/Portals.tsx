import { useCallback } from 'react';
import { Container, Graphics, Sprite } from '@pixi/react';
import portalsbg from "../../../assets/images/game-world/portals.png";

function Portals() {

    const portalsFrame = useCallback((g: any) => {
      g.clear();
      g.beginFill(0x29221c, 0.9);
      g.lineStyle(4, 0x29221c, 1);
      g.moveTo(250, 50);
      g.lineTo(250, 50);
      g.lineTo(1065, 50);
      g.lineTo(1065, 900);
      g.lineTo(250, 900);
      g.lineTo(250, 50);
      g.endFill();
    }, []);

    return (
      <Container position={[0, 2]}>
        <Sprite image={portalsbg} width={1316} height={935} />
        <Graphics draw={portalsFrame} zIndex={0} />
      </Container>
    );
}

export default Portals;