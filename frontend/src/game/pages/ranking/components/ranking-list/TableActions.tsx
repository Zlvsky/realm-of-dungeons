import { Container, Sprite } from '@pixi/react';

import navBtn from "../../../../../assets/images/hud/buttons/navbtn.png"
import nav2Btn from "../../../../../assets/images/hud/buttons/navbtn2.png"

const commonProps = {
  width: 50,
  height: 50,
  cursor: "pointer",
  interactive: true,
};

function TableActions({ totalPages, currentPage, setCurrentPage, maxWidth=650, y=810 }: any) {
    const backToFirst = () => {
        if (!totalPages) return;
        setCurrentPage(1);
    };

    const moveToLast = () => {
        if (!totalPages) return;
        setCurrentPage(totalPages);
    };

    const handlePrevious = () => {
        if (!totalPages) return;
        if (currentPage === 1) return;
        setCurrentPage((prev: number) => prev - 1);
    }

    const handleNext = () => {
        if (!totalPages) return;
        if (currentPage + 1 > totalPages) return;
        setCurrentPage((prev: number) => prev + 1);
    }

    return (
      <Container position={[0, y]}>
        <Sprite
          image={nav2Btn}
          onpointertap={() => {}}
          {...commonProps}
          onpointerdown={backToFirst}
        />
        <Sprite
          image={navBtn}
          onpointertap={() => {}}
          x={50}
          {...commonProps}
          onpointerdown={handlePrevious}
        />

        <Sprite
          image={navBtn}
          onpointertap={() => {}}
          x={maxWidth - 50}
          angle={180}
          anchor={[0, 1]}
          {...commonProps}
          onpointerdown={handleNext}
        />
        <Sprite
          image={nav2Btn}
          onpointertap={() => {}}
          x={maxWidth}
          angle={180}
          anchor={[0, 1]}
          {...commonProps}
          onpointerdown={moveToLast}
        />
      </Container>
    );
}

export default TableActions;