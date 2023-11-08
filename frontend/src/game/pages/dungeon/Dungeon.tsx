import { useState } from 'react'; 
import { Container, Text, TilingSprite } from '@pixi/react';
import BgPattern from "../../../assets/images/dark_wall.png"; 
import { useDispatch, useSelector } from 'react-redux';
import { getHero } from '../../../redux/reducers/gameSlice';
import { realmsData } from '../../../data/realms/data/realmsData';
import DungeonTitle from './components/DungeonTitle';
import MonstersList from './components/MonstersList';
import CurrentMonsterCard from './components/CurrentMonsterCard';
import PreviousMonsterCard from './components/PreviousMonsterCard';
import NextMonsterCard from './components/NextMonsterCard';
import DungeonButton from './components/DungeonButton';
import { isDungeonAvailable } from './helpers/isDungeonAvailable';
import DungeonUnavailable from './components/DungeonUnavailable';

function Dungeon() {
  const hero = useSelector(getHero)!;

  const [realm, setRealm] = useState(realmsData(hero.realms.currentRealm));

  const [realmDungeon] = useState(
    hero.dungeons.find((dungeon) => dungeon.realm === hero.realms.currentRealm)
  ); 

  const isAvailable = isDungeonAvailable(hero);

  if (!isAvailable) return <DungeonUnavailable realm={hero.realms.currentRealm} />

    return (
      <Container position={[0, 2]} interactive={true}>
        <TilingSprite
          image={BgPattern}
          width={1315}
          height={935}
          tilePosition={{ x: 0, y: 0 }}
        />

        <DungeonTitle dungeon={realmDungeon} realm={realm} />
        <MonstersList dungeon={realmDungeon} />

        <PreviousMonsterCard dungeon={realmDungeon} />
        <CurrentMonsterCard dungeon={realmDungeon} />
        <NextMonsterCard dungeon={realmDungeon} />

        <DungeonButton hero={hero} dungeon={realmDungeon} />
      </Container>
    );
}

export default Dungeon;