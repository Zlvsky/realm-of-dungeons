import { Container, Text } from '@pixi/react';
import { TextStyle } from 'pixi.js';

const headerTextStyle = new TextStyle({
  align: "left",
  fontFamily: "Almendra",
  fontWeight: "700",
  fontSize: 22,
  fill: "#ffffff",
});

function TableHeaders() {
    return (
      <Container position={[20, 20]}>
        <Text text={"Rank"} style={headerTextStyle} />
        <Text x={130} text={"Nickname"} style={headerTextStyle} />
        <Text x={330} text={"Level"} style={headerTextStyle} />
        <Text x={470} text={"Reputation"} style={headerTextStyle} />
      </Container>
    );
}

export default TableHeaders;