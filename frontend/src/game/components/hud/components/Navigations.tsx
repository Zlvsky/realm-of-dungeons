import { Container, Sprite } from "@pixi/react";
import portalsBtn from "../../../../assets/images/hud/buttons/portalsbtn.png";
import questsBtn from "../../../../assets/images/hud/buttons/questsbtn.png";
import dungeonBtn from "../../../../assets/images/hud/buttons/dungeonbtn.png";
import heroBtn from "../../../../assets/images/hud/buttons/herobtn.png";
import templeBtn from "../../../../assets/images/hud/buttons/templebtn.png";
import merchantsBtn from "../../../../assets/images/hud/buttons/merchantsbtn.png";
import trainersBtn from "../../../../assets/images/hud/buttons/trainersbtn.png";
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
    stage: "quests",
  },
  {
    image: dungeonBtn,
    stage: "dungeon",
  },
  {
    image: portalsBtn,
    stage: "portals",
  },
  {
    image: heroBtn,
    stage: "hero",
  },
  {
    image: merchantsBtn,
    stage: "merchants",
  },
  {
    image: trainersBtn,
    stage: "trainers",
  },
  {
    image: templeBtn,
    stage: "temple",
  },
];

function Navigations() {
    const dispatch = useDispatch();
    const changeStage = (stage: string) => {
        dispatch(setCurrentStage(stage))
    }
    return (
      <Container position={[50, 260]}>
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
    );
}

export default Navigations;