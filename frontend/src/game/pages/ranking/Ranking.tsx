import { useState } from "react";
import { Container, TilingSprite } from '@pixi/react';
import BgPattern from "../../../assets/images/dark_wall.png"; 
import RankingList from './components/ranking-list/RankingList';
import HeroPreview from "./components/hero-preview/HeroPreview";

function Ranking({ currentHeroId }: any) {
    const [selectedHero, setSelectedHero] = useState<string | null>(
      currentHeroId
    );

    return (
      <Container position={[0, 2]} interactive={true}>
        <TilingSprite
          image={BgPattern}
          width={1315}
          height={935}
          tilePosition={{ x: 0, y: 0 }}
        />
        <RankingList selectedHero={selectedHero} setSelectedHero={setSelectedHero} currentHeroId={currentHeroId} />
        <HeroPreview heroId={selectedHero} />
      </Container>
    );
}

export default Ranking;