import { Container, TilingSprite } from '@pixi/react';
import BgPattern from "../../../assets/images/dark_wall.png"; 


function Dungeon() {
    return (
      <Container position={[0, 2]} interactive={true}>
        <TilingSprite
          image={BgPattern}
          width={1315}
          height={935}
          tilePosition={{ x: 0, y: 0 }}
        />
      </Container>
    );
}

export default Dungeon;