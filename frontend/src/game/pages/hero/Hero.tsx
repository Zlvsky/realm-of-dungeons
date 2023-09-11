import { Container, TilingSprite } from "@pixi/react";
import BgPattern from "../../../assets/images/dark_wall.png" 
import HeroEquipment from "./components/HeroEquipment";

function Hero() {
  return (
    <Container position={[0, 2]} interactive={true}>
      <TilingSprite
        image={BgPattern}
        width={1315}
        height={935}
        tilePosition={{ x: 0, y: 0 }}
      />
      <HeroEquipment />
    </Container>
  );
}

export default Hero;
