import { useState } from "react";
import { Container, Graphics, Sprite, Text } from '@pixi/react';
import { useDispatch } from 'react-redux';
import { setHero } from '../../../redux/reducers/gameSlice';
import fetchHero from '../../../utils/fetchers/fetchHero';
import { battleActionAttack, battleActionPotionRequest } from '../../../client/appClient';
import lowAttack from "../../../assets/images/combat/combat-actions/low.png";
import mediumAttack from "../../../assets/images/combat/combat-actions/medium.png";
import strongAttack from "../../../assets/images/combat/combat-actions/strong.png";

import potionBlank from "../../../assets/images/equipment-slots/potionEqSlot.png";
import spellSlot from "../../../assets/images/equipment-slots/spellsSlot.png";
import displayError from '../../../utils/notifications/errors';
import ActionInfoPopups from "./ActionInfoPopups";


interface IAction {
  x: number;
  image?: string;
  action?: any;
  setCurrentActionHovered: Function;
  index: number;
}

function CombatActions({ hero, battleType, setDamageOutputInfo }: any) {
  const [currentActionHovered, setCurrentActionHovered] = useState<any>(null);

  const dispatch = useDispatch();
  

  const updateHero = (data: any) => {
    dispatch(setHero(data));
  };

  const performAttack = async (attackPower: "low" | "medium" | "strong") => {
    const response = await battleActionAttack({ attackPower, battleType });
    if (response.status !== 200) return displayError(dispatch, response);
    fetchHero(updateHero);
    setDamageOutputInfo(response.data);
  };

  const usePotion = async () => {
    const response = await battleActionPotionRequest(battleType);
    if (response.status !== 200) return displayError(dispatch, response);
    fetchHero(updateHero);
    setDamageOutputInfo(response.data);
  };

  const potionImage = () => {
    const potionSlot = hero.equipment.find(
      (item: any) => item.type === "potion"
    );
    if (!potionSlot.item) return potionBlank;
    return potionSlot.item.image;
  };

  const ActionButton = ({ x, image, action, setCurrentActionHovered, index }: IAction) => {

    const setActionHover = () => {
      setCurrentActionHovered(index);
    }

    const clearActionHover = () => {
      setCurrentActionHovered(null);
    }

    return (
      <Container
        position={[x, 0]}
        width={70}
        height={70}
        onpointerenter={setActionHover}
        onpointerleave={clearActionHover}
      >
        <Graphics
          x={0}
          y={0}
          draw={(g) => {
            g.lineStyle(2, 0x656565);
            g.drawRect(0, 0, 70, 70);
            g.endFill();
          }}
          interactive={true}
        />
        {image && (
          <Sprite
            image={image}
            position={[5, 5]}
            width={60}
            height={60}
            cursor={action ? "pointer" : "default"}
            interactive={true}
            onpointerdown={action}
          />
        )}
      </Container>
    );
  };

  return (
    <Container position={[400, 850]}>
      <ActionInfoPopups
        currentActionHovered={currentActionHovered}
        hero={hero}
      />
      <ActionButton
        x={0}
        image={lowAttack}
        action={() => performAttack("low")}
        setCurrentActionHovered={setCurrentActionHovered}
        index={1}
      />
      <ActionButton
        x={75}
        image={mediumAttack}
        action={() => performAttack("medium")}
        setCurrentActionHovered={setCurrentActionHovered}
        index={2}
      />
      <ActionButton
        x={150}
        image={strongAttack}
        action={() => performAttack("strong")}
        setCurrentActionHovered={setCurrentActionHovered}
        index={3}
      />
      <ActionButton
        x={225}
        image={spellSlot}
        setCurrentActionHovered={setCurrentActionHovered}
        index={4}
      />
      <ActionButton
        x={300}
        image={spellSlot}
        setCurrentActionHovered={setCurrentActionHovered}
        index={5}
      />
      <ActionButton
        x={375}
        image={potionImage()}
        action={usePotion}
        setCurrentActionHovered={setCurrentActionHovered}
        index={6}
      />
    </Container>
  );
}

export default CombatActions;