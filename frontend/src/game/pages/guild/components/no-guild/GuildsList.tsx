import { Container, Graphics, Text } from "@pixi/react";
import { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import displayError from "../../../../../utils/notifications/errors";
import { TextStyle } from "pixi.js";
import { guildsListRequest } from "../../../../../client/appClient";
import TableActions from "../../../ranking/components/ranking-list/TableActions";

const headerTextStyle = new TextStyle({
  align: "left",
  fontFamily: "Almendra",
  fontWeight: "700",
  fontSize: 18,
  fill: "#ffffff",
});

const guildStyle = new TextStyle({
  align: "left",
  fontFamily: "MedievalSharp",
  fontSize: 18,
  letterSpacing: 0.8,
  fill: ["#ffffff"],
});
const guildActiveStyle = new TextStyle({
  align: "left",
  fontFamily: "MedievalSharp",
  fontSize: 18,
  letterSpacing: 0.8,
  fill: ["#B0421A"],
});

const  TableHeaders = () => {
  return (
    <Container position={[20, 20]}>
      <Text text={"Guild name"} style={headerTextStyle} />
      <Text x={190} text={"Leader"} style={headerTextStyle} />
      <Text x={380} text={"Memb."} style={headerTextStyle} />
      <Text x={480} text={"Rep."} style={headerTextStyle} />
    </Container>
  );
}

function TableContent({
  selectedGuild,
  setSelectedGuild,
  data,
}: any) {

  return (
    <Container position={[20, 60]}>
      {data?.items?.map((guild: any, index: number) => {
        const isSelected = guild._id === selectedGuild?._id;

        const textStyle = isSelected ? guildActiveStyle : guildStyle; 

        return (
          <Container
            position={[0, 30 * index]}
            key={"ranking_" + index}
            interactive={true}
            cursor="pointer"
            onpointerdown={() => setSelectedGuild({...guild, type: "PREVIEW"})}
          >
            <Text text={guild.name} style={textStyle} />
            <Text x={190} text={guild.leader.nickname} style={textStyle} />
            <Text
              x={380}
              text={guild.members.length.toString()}
              style={textStyle}
            />
            <Text
              x={480}
              text={guild.reputation.toString()}
              style={textStyle}
            />
          </Container>
        );
      })}
    </Container>
  );
}

function GuildsList({ selectedGuild, setSelectedGuild, fetchHelper }: any) {
  const [data, setData] = useState<any>({});
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();

  const handleFetchGuildList = async () => {
    const response = await guildsListRequest(currentPage);
    if (response.status !== 200) return displayError(dispatch, response);
    setData(response.data);
  };

  useEffect(() => {
    handleFetchGuildList();
  }, [currentPage, fetchHelper]);

  const createFrame = useCallback((g: any) => {
    g.clear();
    g.lineStyle(1, 0x656565);
    g.beginFill(0x2c2c2c, 0.2);
    g.drawRect(0, 0, 600, 500);
    g.endFill();
  }, []);

  return (
    <Container position={[40, 30]}>
      <Graphics x={0} y={0} draw={createFrame} interactive={true} />
      <TableHeaders />
      <TableContent
        selectedGuild={selectedGuild}
        setSelectedGuild={setSelectedGuild}
        data={data}
      />
      <TableActions
        totalPages={data?.totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        maxWidth={600}
        y={510}
      />
    </Container>
  );
}

export default GuildsList;