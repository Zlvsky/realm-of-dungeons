import React, { useState, useEffect } from 'react';
import * as PIXI from "pixi.js";
import { Stage } from "@pixi/react";
import FullWrapper from '../components/layouts/page-wrappers/FullWrapper';
import Menu from './components/Menu';
import btnImg from "../assets/images/btn.png";

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
const aspectRatio = 16 / 9;


function Game() {
    const [size, setSize] = useState({
        width: 800,
        height: 450
    }); 
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
          setSize({
            width: newWidth,
            height: newHeight,
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
            <Menu />
          </Stage>
        </div>
      </FullWrapper>
    );
}

export default Game;