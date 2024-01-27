import { Container, Graphics, Sprite, Text } from '@pixi/react';
import { Assets, TextStyle } from 'pixi.js';
import React, { useCallback } from 'react';


const canvasWidth = 1316;
const canvasHeight = 937;
const rectWidth = 1180;
const rectHeight = 800;

interface INpcPopup {
  setTrigger: Function;
  npc:
    | "alchemist.jpg"
    | "armourer.jpg"
    | "blacksmith.jpg"
    | "elder.jpg"
    | "headhunter.jpg"
    | "traveller.jpg"
    | "witch.jpg";
  title: string;
  children: React.ReactNode;
}

function NpcPopup( {setTrigger, npc, title, children }: INpcPopup ) {
    const npcTextures = Assets.cache.get('/spritesheets/npc/npc.json')?.textures;
    const startX = (canvasWidth - rectWidth) / 2;
    const startY = (canvasHeight - rectHeight) / 2;

    const NpcAvatar = () => {
        if (!npcTextures) return null;
        const npcTextureAvatar = npcTextures[npc];
        if (!npcTextureAvatar) return null;

        return <Sprite texture={npcTextures[npc]} position={[0, 0]} width={110} height={110} />;        
    }

    const NpcTitle = () => {
        const titleStyle = new TextStyle({
          fontFamily: "MedievalSharp",
          fontSize: 32,
          fill: "#ffffff",
          letterSpacing: 0,
        });

        return (
          <Text
            text={title}
            style={titleStyle}
            x={130}
            y={0}
          />
        );
    }

    const exitStyle = new TextStyle({
      fontFamily: "Intern",
      fontSize: 48,
      fill: "#8F2424",
      stroke: "#000000",
      strokeThickness: 2,
      letterSpacing: 0,
    });

    const questFrame = useCallback((g: any) => {
      g.clear();

      g.beginFill(0x000000, 0.8);
      g.lineStyle(4, 0x312b22, 1);

      g.moveTo(0, 0);
      g.lineTo(rectWidth, 0);
      g.lineTo(rectWidth, rectHeight);
      g.lineTo(0, rectHeight);
      g.lineTo(0, 0);

      g.endFill();
    }, []);

    const hanldeClose = () => {
        setTrigger("");
    }


    return (
      <Container position={[startX, startY]}>
        <Graphics draw={questFrame} zIndex={10} />
        <Text
          text="X"
          style={exitStyle}
          x={1130}
          y={10}
          interactive
          cursor="pointer"
          onpointertap={hanldeClose}
        />
        <Container position={[60, 60]}>
          <NpcAvatar />
          <NpcTitle />
          {children}
        </Container>
      </Container>
    );
}

export default NpcPopup;