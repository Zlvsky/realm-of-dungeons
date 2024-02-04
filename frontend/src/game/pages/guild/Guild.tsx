import { Container, TilingSprite } from "@pixi/react";

import BgPattern from "../../../assets/images/dark_wall.png";
import { useSelector } from "react-redux";
import { getHero } from "../../../redux/reducers/gameSlice";
import GuildScreen from "./components/GuildScreen";
import NoGuildScreen from "./components/NoGuildScreen";


function Guild() {
  const hero = useSelector(getHero);

  return (
    <Container position={[0, 2]}>
      <TilingSprite
        image={BgPattern}
        width={1316}
        height={935}
        tilePosition={{ x: 0, y: 0 }}
      />
      {hero?.guild?.memberOf ? <GuildScreen /> : <NoGuildScreen hero={hero!} />}
    </Container>
  );
}

export default Guild;
