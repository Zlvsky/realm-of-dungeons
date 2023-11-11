import { useState, useEffect } from 'react'; 
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
import DungeonBattle from './dungeon-battle/DungeonBattle';
import { getDungeonEnemiesRequest } from '../../../client/appClient';

function Dungeon() {
  const hero = useSelector(getHero)!;

  const realm = realmsData(hero.realms.currentRealm);

  const realmDungeon = hero.dungeons.find((dungeon) => dungeon.realm === hero.realms.currentRealm)
  
  const [dungeonEnemies, setDungeonEnemies] = useState([]);

  const handleFetchEnemies = async () => {
    const response = await getDungeonEnemiesRequest();
    if (response.status !== 200) return;
    setDungeonEnemies(response.data);
  };

  const isAvailable = isDungeonAvailable(hero);

  useEffect(() => {
    handleFetchEnemies();
  }, [hero]);

  if (!isAvailable) return <DungeonUnavailable realm={hero.realms.currentRealm} />

  if (realmDungeon?.battle.isBattleStarted) return <DungeonBattle hero={hero} realmDungeon={realmDungeon} />;

    return (
      <Container position={[0, 2]} interactive={true}>
        <TilingSprite
          image={BgPattern}
          width={1315}
          height={935}
          tilePosition={{ x: 0, y: 0 }}
        />

        <DungeonTitle dungeon={realmDungeon} realm={realm} />
        <MonstersList dungeon={realmDungeon} enemies={dungeonEnemies} />

        <PreviousMonsterCard dungeon={realmDungeon} enemies={dungeonEnemies} />
        <CurrentMonsterCard dungeon={realmDungeon} enemies={dungeonEnemies} />
        <NextMonsterCard dungeon={realmDungeon} enemies={dungeonEnemies} />

        <DungeonButton hero={hero} dungeon={realmDungeon} />
      </Container>
    );
}

export default Dungeon;