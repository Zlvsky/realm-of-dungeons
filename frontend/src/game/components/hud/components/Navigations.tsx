import React from 'react';
import { Stage, Container, Sprite, Text, Graphics } from "@pixi/react";
import questsBtn from "../../../../assets/images/btn.png";
import heroBtn from "../../../../assets/images/herobtn.png";
import { useDispatch } from 'react-redux';
import { setCurrentStage } from '../../../../redux/reducers/gameSlice';

function Navigations() {
    const dispatch = useDispatch();
    const changeStage = (stage: string) => {
        dispatch(setCurrentStage(stage))
    }
    return (
      <Container position={[0, 160]}>
        <Sprite
          image={questsBtn}
          width={150}
          height={120}
          x={0}
          y={0}
          cursor={"pointer"}
          interactive={true}
          onclick={() => changeStage("quests")}
        />
        <Sprite
          image={heroBtn}
          width={150}
          height={120}
          x={0}
          y={120}
          interactive={true}
          cursor={"pointer"}
          onclick={() => changeStage("hero")}
        />
      </Container>
    );
}

export default Navigations;