import { Container } from '@pixi/react';

function GuildPreview({ selectedGuild }: any) {

    if (!selectedGuild) return null;

    return (
        <Container position={[700, 30]}>
            
        </Container>
    );
}

export default GuildPreview;