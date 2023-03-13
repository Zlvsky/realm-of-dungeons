import React, { useState, useEffect } from 'react';
import { BlurFilter } from "pixi.js";
import { Stage, Container, Sprite, Text } from "@pixi/react";
import FullWrapper from '../components/layouts/page-wrappers/FullWrapper';

function Game() {
    const [size, setSize] = useState({
        width: 800,
        height: 450
    }); 
    useEffect(() => {
        function updateSize() {
          setSize({
            width: window.innerWidth,
            height: window.innerWidth * 0.5625,
          });
        }
        window.addEventListener("resize", updateSize);
        updateSize();
        return () => window.removeEventListener("resize", updateSize);
    }, [])
    return (
      <FullWrapper>
        <Stage
          height={size.height}
          width={size.width}
          className="mx-auto"
          //   options={{ resizeTo: window }}
        ></Stage>
      </FullWrapper>
    );
}

export default Game;