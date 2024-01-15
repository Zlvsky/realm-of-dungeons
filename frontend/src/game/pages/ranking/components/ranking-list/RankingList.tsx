import { useState, useEffect } from "react";
import { Container, Graphics } from '@pixi/react';
import TableHeaders from './TableHeaders';
import TableContent from './TableContent';
import TableActions from './TableActions';
import { rankingRequest } from "../../../../../client/appClient";
import displayError from "../../../../../utils/notifications/errors";
import { useDispatch } from "react-redux";


function RankingList({ selectedHero, setSelectedHero, currentHeroId }: any) {
  const [data, setData] = useState<any>({});
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();

  const handleFetchRanking = async () => {
    const response = await rankingRequest(currentPage);
    if (response.status !== 200) return displayError(dispatch, response);
    setData(response.data);
  }
 
  useEffect(() => {
    handleFetchRanking();
  }, [currentPage]);

  return (
    <Container position={[40, 30]}>
      <Graphics
        x={0}
        y={0}
        draw={(g) => {
          g.lineStyle(1, 0x656565);
          g.beginFill(0x2c2c2c, 0.8);
          g.drawRect(0, 0, 650, 800);
          g.endFill();
        }}
        interactive={true}
      />
      <TableHeaders />
      <TableContent
        selectedHero={selectedHero}
        setSelectedHero={setSelectedHero}
        currentHeroId={currentHeroId}
        data={data}
      />
      <TableActions
        totalPages={data?.totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </Container>
  );
}

export default RankingList;