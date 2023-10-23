import { Container, TilingSprite } from '@pixi/react';
import divider1 from "../../../assets/images/hud/divider1.png";
import divider2 from "../../../assets/images/hud/divider2.png";
import { useSelector } from 'react-redux';
import { getGameDimensions } from '../../../redux/reducers/gameSlice';

function HudBorders() {
    const dimensions = useSelector(getGameDimensions);
    return (
      <Container
        width={350}
        scale={[dimensions.scaleW, dimensions.scaleH]}
        position={[20, 0]}
      >
        <TilingSprite
          image={divider1}
          width={40}
          height={975}
          tilePosition={{ x: 0, y: 0 }}
          position={[310, 0]}
        />
        <TilingSprite
          image={divider2}
          width={40}
          height={975}
          tilePosition={{ x: 0, y: 0 }}
          position={[-35, 0]}
        />
      </Container>
    );
}

export default HudBorders;