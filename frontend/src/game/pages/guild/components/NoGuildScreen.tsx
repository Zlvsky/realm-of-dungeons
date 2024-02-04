import { useState } from 'react';
import { IHeroProp } from '../../../../interfaces/ComponentsInterfaces';
import { Container } from '@pixi/react';
import CreateGuild from './no-guild/CreateGuild';
import InvitesList from './no-guild/InvitesList';
import GuildsList from './no-guild/GuildsList';
import GuildPreview from './no-guild/GuildPreview';

export interface ISelectedGuild {
  _id: string;
  name: string;
  leader: {
    nickname: string;
  };
  members: string[];
  reputation: number;
  description: string;
  statistics: any;
  requested: boolean;
  type: "INVITE" | "PREVIEW";
}

function NoGuildScreen({ hero }: IHeroProp) {
    const [selectedGuild, setSelectedGuild] = useState<ISelectedGuild | null>(
      null
    );

    const [fetchHelper, setFetchHelper] = useState(false);

    const handleFetchList = () => {
      setFetchHelper(prev => !prev);
    } 

    return (
      <Container>
        <CreateGuild />
        <InvitesList
          hero={hero!}
          selectedGuild={selectedGuild}
          setSelectedGuild={setSelectedGuild}
        />
        <GuildsList
          selectedGuild={selectedGuild}
          setSelectedGuild={setSelectedGuild}
          fetchHelper={fetchHelper}
        />
        <GuildPreview
          setSelectedGuild={setSelectedGuild}
          selectedGuild={selectedGuild}
          handleFetchList={handleFetchList}
        />
      </Container>
    );
}

export default NoGuildScreen;