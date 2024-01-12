import {  Container, Sprite } from "@pixi/react";
import HeroInfo from "./components/HeroInfo";
import Navigations from "./components/Navigations";
import {  useSelector } from "react-redux";
import { getGameDimensions } from "../../../redux/reducers/gameSlice";

import hudBg from "../../../assets/images/hud/wallBg.png";
import Logout from "./components/Logout";
import Discord from "./components/Discord";

function Menu() {
  const dimensions = useSelector(getGameDimensions);
  return (
    <Container
      width={350}
      scale={[dimensions.scaleW, dimensions.scaleH]}
      position={[20, 0]}
    >
      <Sprite image={hudBg} width={350} height={935} />
      <HeroInfo />
      <Navigations />
      <Logout />
      <Discord />
    </Container>
  );
}


export default Menu;
