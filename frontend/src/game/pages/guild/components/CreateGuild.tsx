import { useState } from "react";
import { Container, Graphics, Sprite, Text, withFilters } from '@pixi/react';
import { ColorMatrixFilter, TextStyle } from 'pixi.js';
import { useCallback, useRef, useEffect } from 'react';
import generateTextInput from './TextInput';
import IconWithText from '../../../../components/common/text/IconWithText';

import GoldIcon from "../../../../assets/images/icons/gui/gold-icon.png";
import AcceptBtn from "../../../../assets/images/acceptbtn.png";
import { createGuildRequest } from "../../../../client/appClient";
import displayError from "../../../../utils/notifications/errors";
import { useDispatch } from "react-redux";
import fetchHero from "../../../../utils/fetchers/fetchHero";
import { setHero } from "../../../../redux/reducers/gameSlice";


const textStyle = new TextStyle({
  align: "left",
  fontFamily: "MedievalSharp",
  fontSize: 18,
  letterSpacing: 0.4,
  fill: ["#ffffff"],
});

const rectWidth = 550;
const rectHeight = 300;

const DisabledFilter: any = withFilters(Container, {
  matrix: ColorMatrixFilter,
});

function CreateGuild() {
    const containerRef = useRef<any>(null);
    const [guildName, setGuildName] = useState("");

    const dispatch = useDispatch();

    const updateHero = (data: any) => {
      dispatch(setHero(data));
    };

    const createFrame = useCallback((g: any) => {
      g.clear();

      g.beginFill(0x2c2c2c, 0.3);
      g.lineStyle(2, 0x656565, 1);

      g.moveTo(0, 0);
      g.lineTo(rectWidth, 0);
      g.lineTo(rectWidth, rectHeight);
      g.lineTo(0, rectHeight);
      g.lineTo(0, 0);

      g.endFill();
    }, []);

    const handleGenerateTextInput = useCallback(() => {
      generateTextInput(containerRef, setGuildName);
    }, [])

    const handleCreateGuild = async () => {
      const response = await createGuildRequest(guildName);
      if (response.status !== 200) return displayError(dispatch, response);
      fetchHero(updateHero);
    }

    useEffect(() => {
        if (!containerRef.current) return;
        handleGenerateTextInput();
    }, []);

    const AcceptButton = () => {
      const isCorrectName = guildName.length < 3;

      return (
        <DisabledFilter
          matrix={{ enabled: true }}
          apply={
            isCorrectName
              ? ({ matrix }: any) => matrix.blackAndWhite()
              : undefined
          }
        >
          <Sprite
            image={AcceptBtn}
            width={150}
            height={150}
            x={140}
            y={-63}
            cursor={isCorrectName ? "default" : "pointer"}
            interactive={isCorrectName ? false : true}
            onpointerdown={handleCreateGuild}
          />
        </DisabledFilter>
      );};

    return (
      <Container position={[40, 600]} ref={containerRef}>
        <Graphics draw={createFrame} zIndex={10} />
        <Text
          text={"Create your own Guild"}
          anchor={[0.5, 0]}
          x={rectWidth / 2}
          y={10}
          style={
            new TextStyle({
              align: "center",
              fontFamily: "Almendra",
              fontSize: 26,
              letterSpacing: 1,
              fill: ["#ffffff"],
            })
          }
        />
        <Text
          text={"It seems like you are not member in any Guild."}
          y={60}
          x={10}
          style={textStyle}
        />
        <Text
          text={"If you wish to create one, pay a fee and name your guild"}
          y={85}
          x={10}
          style={textStyle}
        />

        <Container position={[220, 240]}>
          <Text text={`Fee:`} x={0} y={0} style={textStyle} />
          <IconWithText
            text={"50"}
            image={GoldIcon}
            position={[40, -6]}
            textStyle={textStyle}
          />
          <AcceptButton />
        </Container>
      </Container>
    );
}

export default CreateGuild;