import React, { useState, useEffect } from 'react';
import * as PIXI from "pixi.js";
import { Stage } from "@pixi/react";
import FullWrapper from '../components/layouts/page-wrappers/FullWrapper';
import Menu from './components/Menu';
import btnImg from "../assets/images/btn.png";
import { useDispatch, useSelector } from 'react-redux';
import { getGameDimensions, setScale } from '../redux/reducers/gameSlice';
import GameStage from './components/GameStage';

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
const aspectRatio = 16 / 9;


function Game() {
    const [currentStage, setCurrentStage] = useState("");
    const [size, setSize] = useState({
        width: 800,
        height: 450,
        scaleW: 1,
        scaleH: 1,
    });
    const dispatch = useDispatch();
    const gameDim = useSelector(getGameDimensions);
    
    useEffect(() => {
        function updateSize() {
          const width = window.innerWidth;
          const height = window.innerHeight;
          // Calculate the new dimensions of the stage
          let newWidth = width;
          let newHeight = height;
          if (width / height > aspectRatio) {
            // If the window is wider than 16:9, set the height to fill the window
            newWidth = height * aspectRatio;
          } else {
            // If the window is taller than 16:9, set the width to fill the window
            newHeight = width / aspectRatio;
          }
          const scaleW = newWidth / gameDim.dimensions.width;
          const scaleH = newHeight / gameDim.dimensions.height
          
          setSize({
            width: newWidth,
            height: newHeight,
            scaleW: scaleW,
            scaleH: scaleH
          });
        }
        window.addEventListener("resize", updateSize);
        updateSize();
        return () => window.removeEventListener("resize", updateSize);
    }, [])
    return (
      <FullWrapper>
        <div className="flex justify-center items-center">
          <Stage
            height={size.height}
            width={size.width}
            className="mx-auto"
            raf={true}
            options={{ autoDensity: true }}
          >
            <Menu size={size} setCurrentStage={setCurrentStage} />
            <GameStage size={size} stage={currentStage} />
          </Stage>
        </div>
      </FullWrapper>
    );
}

export default Game;