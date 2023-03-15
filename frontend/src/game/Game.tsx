import React, { useState, useEffect } from "react";
import * as PIXI from "pixi.js";
import FullWrapper from "../components/layouts/page-wrappers/FullWrapper";
import Hud from "./components/hud/Hud";
import { useDispatch } from "react-redux";
import { setDimensions, setHero } from "../redux/reducers/gameSlice";
import { getUserCharacter } from "../client/appClient";
import GameWorld from "./components/GameWorld";
import GameStage from "./game-context/GameStage";


PIXI.BaseTexture.defaultOptions.scaleMode = PIXI.SCALE_MODES.NEAREST;
const ROOT_WIDTH = 1666;
const ROOT_HEIGHT = 937;
const ASPECT_RATIO = 16 / 9;

function Game() {
  const [loading, setLoading] = useState(true);
  const [size, setSize] = useState({
    width: ROOT_WIDTH,
    height: ROOT_HEIGHT,
    scaleW: 1,
    scaleH: 1,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchHero = async () => {
      const heroId: any = localStorage.getItem("hero");
      const response = await getUserCharacter(heroId);
      if(response.status !== 200) return () => {console.log(response.data); setLoading(false)};
      dispatch(setHero(response.data));
      setLoading(false);
    }
    fetchHero();
  }, [])

  useEffect(() => {
    function updateSize() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      // Calculate the new dimensions of the stage
      let newWidth = width;
      let newHeight = height;
      if (width / height > ASPECT_RATIO) {
        // If the window is wider than 16:9, set the height to fill the window
        newWidth = height * ASPECT_RATIO;
      } else {
        // If the window is taller than 16:9, set the width to fill the window
        newHeight = width / ASPECT_RATIO;
      }
      const scaleW = newWidth / ROOT_WIDTH;
      const scaleH = newHeight / ROOT_HEIGHT;

      const newDimensions = {
        width: newWidth,
        height: newHeight,
        scaleW: scaleW,
        scaleH: scaleH,
      };
      setSize(newDimensions);
      dispatch(setDimensions(newDimensions));
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  if(loading) {
    return (
      <FullWrapper>
        <div className="bg-black flex justify-center items-center">
          <h1 className="text-white text-xl font-semibold">Loading game...</h1>
        </div>
      </FullWrapper>
    );
    
  }

  return (
    <FullWrapper>
      <div className="flex justify-center items-center">
        <GameStage
          height={size.height}
          width={size.width}
          className="mx-auto"
          raf={true}
          options={{ autoDensity: true, resolution: window.devicePixelRatio }}
        >
          <Hud />
          <GameWorld />
        </GameStage>
      </div>
    </FullWrapper>
  );
}

export default Game;
