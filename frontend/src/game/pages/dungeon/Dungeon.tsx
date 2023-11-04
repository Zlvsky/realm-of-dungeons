import { useState } from 'react'; 
import { Container, Text, TilingSprite } from '@pixi/react';
import BgPattern from "../../../assets/images/dark_wall.png"; 
import { TextStyle } from 'pixi.js';
import { useDispatch, useSelector } from 'react-redux';
import { getHero } from '../../../redux/reducers/gameSlice';
import { realmsData } from '../../../data/realms/data/realmsData';
import DungeonTitle from './components/DungeonTitle';
import MonstersList from './components/MonstersList';

import testImg from "./components/test.jpg";
import CurrentMonsterCard from './components/CurrentMonsterCard';
import PreviousMonsterCard from './components/PreviousMonsterCard';
import NextMonsterCard from './components/NextMonsterCard';
import DungeonButton from './components/DungeonButton';

const dungeons = {
  currentMonster: 1,
  dungeonRenewDate: "2023-10-31T19:57:03.878Z",
  monsters: [
    { name: "Crypt Horror", img: testImg, level: 21, description: "You see a terryfying creature seeking in shadows.  " },
    { name: "Crypt Horror", img: testImg, level: 21, description: "You see a terryfying creature seeking in shadows.  " },
    { name: "Crypt Horror", img: testImg, level: 21, description: "You see a terryfying creature seeking in shadows.  " },
    { name: "Crypt Horror", img: testImg, level: 21, description: "You see a terryfying creature seeking in shadows.  " },
    { name: "Crypt Horror", img: testImg, level: 21, description: "You see a terryfying creature seeking in shadows.  " },
    { name: "Crypt Horror", img: testImg, level: 21, description: "You see a terryfying creature seeking in shadows.  " },
    { name: "Crypt Horror", img: testImg, level: 21, description: "You see a terryfying creature seeking in shadows.  " },
    { name: "Crypt Horror", img: testImg, level: 21, description: "You see a terryfying creature seeking in shadows.  " },
    { name: "Crypt Horror", img: testImg, level: 21, description: "You see a terryfying creature seeking in shadows.  " },
    { name: "Crypt Horror", img: testImg, level: 21, description: "You see a terryfying creature seeking in shadows.  " },
  ],
};

function Dungeon() {
  const hero = useSelector(getHero)!;
  const dispatch = useDispatch();
  const [realm, setRealm] = useState(realmsData(hero.realms.currentRealm));

    return (
      <Container position={[0, 2]} interactive={true}>
        <TilingSprite
          image={BgPattern}
          width={1315}
          height={935}
          tilePosition={{ x: 0, y: 0 }}
        />

        <DungeonTitle hero={hero} realm={realm} />
        <MonstersList dungeons={dungeons} />

        <PreviousMonsterCard dungeons={dungeons} />
        <CurrentMonsterCard dungeons={dungeons} />
        <NextMonsterCard dungeons={dungeons} />

        <DungeonButton hero={hero} dungeons={dungeons} />
      </Container>
    );
}

export default Dungeon;