import { useEffect, useState } from 'react';
import NpcPopup from '../../../../components/ui/NpcPopup';
import { ICharacter, IDungeon } from '../../../../../interfaces/MainInterface';
import { realmsData } from '../../../../../data/realms/data/realmsData';
import { getDungeonEnemiesRequest } from '../../../../../client/appClient';
import { isDungeonAvailable } from '../../../../components/dungeon/helpers/isDungeonAvailable';
import DungeonTitle from '../../../../components/dungeon/DungeonTitle';
import MonstersList from '../../../../components/dungeon/MonstersList';
import CurrentMonsterCard from '../../../../components/dungeon/CurrentMonsterCard';
import NextMonsterCard from '../../../../components/dungeon/NextMonsterCard';
import DungeonButton from '../../../../components/dungeon/DungeonButton';
import DungeonUnavailable from './DungeonUnavailable';

interface IDungeonNpc {
  hero: ICharacter;
  setCurrentNpc: Function;
  realmDungeon: IDungeon;
}

function DungeonNpc({ hero, setCurrentNpc, realmDungeon }: IDungeonNpc) {
  const realm = realmsData(hero.realms.currentRealm);
  
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

  return (
    <NpcPopup
      setTrigger={setCurrentNpc}
      npc={"headhunter.jpg"}
      title={"Bestow your trophy"}
      description={
        "Adventurer! Bring forth the trophy of your vanquished foe from darkened depths of\nDungeons, and in return, I shall bestow upon  you rewards worthy of your bravery."
      }
    >
      {isAvailable ? (
        <>
          <DungeonTitle dungeon={realmDungeon} realm={realm} />
          <MonstersList dungeon={realmDungeon} enemies={dungeonEnemies} />

          <CurrentMonsterCard dungeon={realmDungeon} enemies={dungeonEnemies} />
          <NextMonsterCard dungeon={realmDungeon} enemies={dungeonEnemies} />

          <DungeonButton hero={hero} dungeon={realmDungeon} />
        </>
      ) : (
        <DungeonUnavailable realm={hero.realms.currentRealm} />
      )}
    </NpcPopup>
  );
}

export default DungeonNpc;