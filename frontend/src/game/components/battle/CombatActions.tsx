import { Container, Graphics, Sprite } from '@pixi/react';
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

interface IAction {
  x: number;
  image?: string;
  action: any;
}

function CombatActions({ hero, battleType }: any) {

  const dispatch = useDispatch();

  const updateHero = (data: any) => {
    dispatch(setHero(data));
  };

  const performAttack = async (attackPower: "low" | "medium" | "strong") => {
    const response = await battleActionAttack({ attackPower, battleType });
    if (response.status !== 200) return displayError(dispatch, response);
    fetchHero(updateHero);
  };

  const usePotion = async () => {
    const response = await battleActionPotionRequest(battleType);
    if (response.status !== 200) return displayError(dispatch, response);
    fetchHero(updateHero);
  }

  const potionImage = () => {
    const potionSlot = hero.equipment.find((item: any) => item.type === "potion");  
    if (!potionSlot.item) return potionBlank;
    return potionSlot.item.image;
  }

  const ActionButton = ({ x, image, action }: IAction) => {
    return (
      <Container position={[x, 0]} width={70} height={70}>
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
            cursor={"pointer"}
            interactive={true}
            onclick={action}
          />
        )}
      </Container>
    );
  };

  return (
    <Container position={[400, 850]}>
      <ActionButton
        x={0}
        image={lowAttack}
        action={() => performAttack("low")}
      />
      <ActionButton
        x={75}
        image={mediumAttack}
        action={() => performAttack("medium")}
      />
      <ActionButton
        x={150}
        image={strongAttack}
        action={() => performAttack("strong")}
      />
      <ActionButton x={225} image={spellSlot} action={""} />
      <ActionButton x={300} image={spellSlot} action={""} />
      <ActionButton x={375} image={potionImage()} action={usePotion} />
    </Container>
  );
}

export default CombatActions;