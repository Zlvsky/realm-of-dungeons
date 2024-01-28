import { Container, Sprite } from "@pixi/react";
import portalsBtn from "../../../../assets/images/hud/buttons/portalsbtn.png";
import questsBtn from "../../../../assets/images/hud/buttons/questsbtn.png";
import dungeonBtn from "../../../../assets/images/hud/buttons/dungeonbtn.png";
import heroBtn from "../../../../assets/images/hud/buttons/herobtn.png";
import templeBtn from "../../../../assets/images/hud/buttons/templebtn.png";
import merchantsBtn from "../../../../assets/images/hud/buttons/merchantsbtn.png";
import trainersBtn from "../../../../assets/images/hud/buttons/trainersbtn.png";
import rankingBtn from "../../../../assets/images/hud/buttons/rankingbtn.png";
import { useDispatch } from 'react-redux';
import { setCurrentStage } from '../../../../redux/reducers/gameSlice';

const commonProps = {
  width: 200,
  height: 58,
  x: 0,
  cursor: "pointer",
  interactive: true,
}

const buttonsData = [
  {
    image: questsBtn,
    stage: "village",
  },
  {
    image: questsBtn,
    stage: "tavern",
  },
  {
    image: heroBtn,
    stage: "hero",
  },
  {
    image: templeBtn,
    stage: "temple",
  },
  {
    image: rankingBtn,
    stage: "ranking",
  },
  {
    image: rankingBtn,
    stage: "guild",
  },
];

function Navigations() {
    const dispatch = useDispatch();
    const changeStage = (stage: string) => {
        dispatch(setCurrentStage(stage))
    }
    return (
      <Container position={[0, 150]}>
        {/* <Container>
          <Sprite
            image={heroBtn}
            y={0}
            onpointertap={() => changeStage("hero")}
            {...commonProps}
            x={-10}
            width={160}
            height={50}
          />
          <Sprite
            image={rankingBtn}
            y={0}
            onpointertap={() => changeStage("ranking")}
            {...commonProps}
            x={160}
            width={160}
            height={50}
          />
        </Container> */}
        <Container position={[50, 0]}>
          {buttonsData.map((button, index) => (
            <Sprite
              image={button.image}
              y={80 * index}
              onpointertap={() => changeStage(button.stage)}
              key={index}
              {...commonProps}
            />
          ))}
        </Container>
      </Container>
    );
}

export default Navigations;