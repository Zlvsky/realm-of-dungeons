import React, { useContext } from "react";
import { Stage, Container, Sprite, Text } from "@pixi/react";
import { connect } from "react-redux";
import HeroInfo from "./components/HeroInfo";
import Navigations from "./components/Navigations";
import { ReactReduxContext, useSelector } from "react-redux";
import { getGameDimensions } from "../../../redux/reducers/gameSlice";

function Menu() {
  const dimensions = useSelector(getGameDimensions);
  return (
    <Container
      width={350}
      scale={[dimensions.scaleW, dimensions.scaleH]}
      position={[20, 0]}
    >
      <HeroInfo />
      <Navigations />
    </Container>
  );
}


export default Menu;
