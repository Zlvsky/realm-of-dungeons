import { useState, useEffect,  useCallback } from 'react';
import { TextStyle } from 'pixi.js';
import { useDispatch } from 'react-redux';
import { setHero } from '../../../../../redux/reducers/gameSlice';
import { Container, Graphics, Text } from '@pixi/react';
import { IHeroProp } from '../../../../../interfaces/ComponentsInterfaces';
import { guildInvitesRequest } from '../../../../../client/appClient';
import displayError from '../../../../../utils/notifications/errors';

interface IInvitesList extends IHeroProp {
  selectedGuild: string | null;
  setSelectedGuild: any;
}

const textStyle = new TextStyle({
  align: "left",
  fontFamily: "MedievalSharp",
  fontSize: 18,
  letterSpacing: 0.4,
  fill: ["#ffffff"],
});

const guildStyle = new TextStyle({
  align: "left",
  fontFamily: "MedievalSharp",
  fontSize: 23,
  letterSpacing: 0.8,
  fill: ["#ffffff"],
});
const guildActiveStyle = new TextStyle({
  align: "left",
  fontFamily: "MedievalSharp",
  fontSize: 23,
  letterSpacing: 0.8,
  fill: ["#B0421A"],
});

const headerTextStyle = new TextStyle({
  align: "left",
  fontFamily: "Almendra",
  fontWeight: "700",
  fontSize: 22,
  fill: "#ffffff",
});

const rectWidth = 550;
const rectHeight = 300;

const GuildInvites = ({ selectedGuild ,setSelectedGuild }: any) => {
  const [invites, setInvites] = useState<string[]>([]);

  const dispatch = useDispatch();

  const handleFetchInvites = async () => {
    const response = await guildInvitesRequest();
    if (response.status !== 200) return displayError(dispatch, response);
    setInvites(response.data.items);
  };

  useEffect(() => {
    handleFetchInvites();
  }, []);

  return (
    <Container position={[30, 60]}>
      <Text text={"Guild name"} style={headerTextStyle} />
      {invites.map((invite: any, index: number) => {
        return (
          <Container key={"invite_" + index} position={[0, 30 * (index + 1)]}>
            <Text
              text={invite.name}
              y={0}
              x={0}
              style={
                selectedGuild === invite._id ? guildActiveStyle : guildStyle
              }
              interactive
              cursor="pointer"
              onpointertap={() => setSelectedGuild(invite._id)}
            />
          </Container>
        );
      })}
    </Container>
  );
};

function InvitesList({ hero, selectedGuild, setSelectedGuild }: IInvitesList) {
  const dispatch = useDispatch();

  const updateHero = (data: any) => {
    dispatch(setHero(data));
  };

  const createFrame = useCallback((g: any) => {
    g.clear();

    g.beginFill(0x2c2c2c, 0.3);
    g.lineStyle(2, 0x656565, 1);

    g.moveTo(0, 0);
    g.lineTo(rectWidth, 0);
    g.lineTo(rectWidth, rectHeight);
    g.lineTo(0, rectHeight);
    g.lineTo(0, 0);

    g.endFill();
  }, []);

  return (
    <Container position={[760, 600]}>
      <Graphics draw={createFrame} />
      <Text
        text={"Guild invites"}
        anchor={[0.5, 0]}
        x={rectWidth / 2}
        y={10}
        style={
          new TextStyle({
            align: "center",
            fontFamily: "Almendra",
            fontSize: 26,
            letterSpacing: 1,
            fill: ["#ffffff"],
          })
        }
      />
      {hero.guild.invites.length === 0 ? (
        <Text text={"Invites list is empty."} y={60} x={10} style={textStyle} />
      ) : (
        <GuildInvites
          selectedGuild={selectedGuild}
          setSelectedGuild={setSelectedGuild}
        />
      )}
    </Container>
  );
}

export default InvitesList;