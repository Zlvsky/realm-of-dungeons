import { useState, useEffect } from "react";
import { Container } from '@pixi/react';
import { IGuild } from '../../../../interfaces/GuildInterface';
import { IHeroProp } from "../../../../interfaces/ComponentsInterfaces";
import { guildInfoRequest } from "../../../../client/appClient";
import displayError from "../../../../utils/notifications/errors";
import { useDispatch } from "react-redux";
import GuildStats from "./in-guild/GuildStats";
import GuildMembers from "./in-guild/GuildMembers";
import GuildInfo from "./in-guild/GuildInfo";
import GuildChat from "./in-guild/GuildChat";

function GuildScreen({ hero } :IHeroProp) {
    const [guild, setGuild] = useState<IGuild | null>(null);

    const dispatch = useDispatch();

    const handleFetchGuild = async () => {
        const response = await guildInfoRequest();
        if (response.status !== 200) return displayError(dispatch, response);
        setGuild(response.data);
    }

    useEffect(() => {
        handleFetchGuild();
    }, []);


    if (!guild) return null;

    return (
      <Container>
        <GuildStats guild={guild} />
        <GuildInfo guild={guild} />
        <GuildMembers guild={guild} />
        <GuildChat guild={guild} />
      </Container>
    );
}

export default GuildScreen;