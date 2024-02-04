import { useCallback } from 'react';
import { Container, Graphics, Sprite, Text, withFilters } from '@pixi/react';
import { useDispatch } from 'react-redux';
import { setHero } from '../../../../../redux/reducers/gameSlice';
import { ColorMatrixFilter, TextStyle } from 'pixi.js';
import { ISelectedGuild } from '../NoGuildScreen';
import acceptBtn from "../../../../../assets/images/acceptbtn.png";
import { guildInviteDeclineRequest, guildJoinRequest, guildRequestRequest } from '../../../../../client/appClient';
import displayError from '../../../../../utils/notifications/errors';
import fetchHero from '../../../../../utils/fetchers/fetchHero';

const rectWidth = 550;
const rectHeight = 500;

interface IGuildPreview {
  selectedGuild: ISelectedGuild | null;
  setSelectedGuild: Function;
  handleFetchList: any;
}

const DisabledFilter: any = withFilters(Container, {
  matrix: ColorMatrixFilter,
});

function GuildPreview({ selectedGuild, setSelectedGuild, handleFetchList }: IGuildPreview) {
  const dispatch = useDispatch();

  const updateHero = (data: any) => {
    dispatch(setHero(data));
  };

  const handleRequestGuild = async () => {
    const response = await guildRequestRequest(selectedGuild?._id!);
    if (response.status !== 200) return displayError(dispatch, response);
    handleFetchList();
    setSelectedGuild((prev: any) => ({...prev, requested: true}));
  };
  
  const handleJoinGuild = async () => {
    const response = await guildJoinRequest(selectedGuild?._id!);
    if (response.status !== 200) return displayError(dispatch, response);
    fetchHero(updateHero);
    setSelectedGuild(null);
  };
  
  const handleDeclineInviteGuild = async () => {
    const response = await guildInviteDeclineRequest(selectedGuild?._id!);
    if (response.status !== 200) return displayError(dispatch, response);
    fetchHero(updateHero);
    setSelectedGuild(null);
  };

  const createFrame = useCallback((g: any) => {
    g.clear();

    g.beginFill(0x2c2c2c, 0.3);
    g.lineStyle(1, 0x656565, 1);

    g.moveTo(0, 0);
    g.lineTo(rectWidth, 0);
    g.lineTo(rectWidth, rectHeight);
    g.lineTo(0, rectHeight);
    g.lineTo(0, 0);

    g.endFill();
  }, []);

  const ActionButtons = () => {
    const RequestButton = () => (
      <DisabledFilter
        matrix={{ enabled: true }}
        apply={
          selectedGuild!.requested
            ? ({ matrix }: any) => matrix.blackAndWhite()
            : undefined
        }
      >
        <Sprite
          image={acceptBtn}
          width={150}
          height={150}
          anchor={[0.5, 0]}
          x={550 / 2}
          y={0}
          cursor={selectedGuild!.requested ? "default" : "pointer"}
          interactive={selectedGuild!.requested ? false : true}
          onpointerdown={handleRequestGuild}
        />
      </DisabledFilter>
    );

    const InviteButtons = () => (
      <>
        <Sprite
          image={acceptBtn}
          width={150}
          height={150}
          anchor={[0.5, 0]}
          x={350 / 2}
          y={0}
          cursor={"pointer"}
          interactive={true}
          onpointerdown={handleJoinGuild}
        />
        <Sprite
          image={acceptBtn}
          width={150}
          height={150}
          anchor={[0.5, 0]}
          x={750 / 2}
          y={0}
          cursor={"pointer"}
          interactive={true}
          onpointerdown={handleDeclineInviteGuild}
        />
      </>
    );

    return (
      <Container position={[0, 380]}>
        {selectedGuild?.type === "PREVIEW" ? (
          <RequestButton />
        ) : (
          <InviteButtons />
        )}
      </Container>
    );
  };

  if (!selectedGuild) return null;

  return (
    <Container position={[760, 30]}>
      <Graphics draw={createFrame} />
      <Text
        text={selectedGuild.name}
        x={30}
        y={30}
        style={
          new TextStyle({
            align: "center",
            fontFamily: "Almendra",
            fontSize: 30,
            letterSpacing: 1,
            fill: ["#ffffff"],
          })
        }
      />
      <Text
        text={"GUILD LEVEL " + selectedGuild.statistics.level.toString()}
        x={30}
        y={65}
        style={
          new TextStyle({
            align: "center",
            fontFamily: "MedievalSharp",
            fontSize: 18,
            letterSpacing: 1,
            fill: ["#bcbcbc"],
          })
        }
      />
      <Text
        text={`Members ${selectedGuild.members.length.toString()}/${5 + (selectedGuild.statistics.level - 1)}`}
        x={30}
        y={100}
        style={
          new TextStyle({
            align: "center",
            fontFamily: "MedievalSharp",
            fontSize: 18,
            letterSpacing: 1,
            fill: ["#bcbcbc"],
          })
        }
      />
      <Text
        text={"Reputation " + selectedGuild.reputation.toString()}
        x={180}
        y={100}
        style={
          new TextStyle({
            align: "center",
            fontFamily: "MedievalSharp",
            fontSize: 18,
            letterSpacing: 1,
            fill: ["#bcbcbc"],
          })
        }
      />
      <Text
        text={"Leader: " + selectedGuild.leader.nickname}
        x={30}
        y={140}
        style={
          new TextStyle({
            align: "center",
            fontFamily: "MedievalSharp",
            fontSize: 18,
            letterSpacing: 1,
            fill: ["#bcbcbc"],
          })
        }
      />
      {selectedGuild.description.length !== 0 && (
        <>
          <Text
            text={"Description"}
            x={30}
            y={180}
            style={
              new TextStyle({
                align: "center",
                fontFamily: "MedievalSharp",
                fontSize: 18,
                letterSpacing: 1,
                fill: ["#ffffff"],
              })
            }
          />
          <Text
            text={selectedGuild.description}
            x={30}
            y={200}
            style={
              new TextStyle({
                align: "left",
                fontFamily: "MedievalSharp",
                fontSize: 18,
                letterSpacing: 1,
                wordWrap: true,
                wordWrapWidth: 500,
                fill: ["#bcbcbc"],
              })
            }
          />
        </>
      )}
      <ActionButtons />
    </Container>
  );
}

export default GuildPreview;