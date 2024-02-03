import { useState } from 'react';
import { IHeroProp } from '../../../../interfaces/ComponentsInterfaces';
import { Container } from '@pixi/react';
import CreateGuild from './no-guild/CreateGuild';
import InvitesList from './no-guild/InvitesList';
import GuildsList from './no-guild/GuildsList';

function NoGuildScreen({ hero }: IHeroProp) {
    const [selectedGuild, setSelectedGuild] = useState<string | null>(null)

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
        />
      </Container>
    );
}

export default NoGuildScreen;