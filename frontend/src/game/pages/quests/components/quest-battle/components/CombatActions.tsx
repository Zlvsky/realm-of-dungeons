import { Container, Graphics, Sprite } from '@pixi/react';
import lowAttack from "../../../../../../assets/images/combat/combat-actions/low.png"
import mediumAttack from "../../../../../../assets/images/combat/combat-actions/medium.png"
import strongAttack from "../../../../../../assets/images/combat/combat-actions/strong.png"
import { questActionAttack, questActionPotion } from '../../../../../../client/appClient';
import fetchHero from '../../../../../../utils/fetchers/fetchHero';
import { connect } from 'react-redux';
import { setHero } from '../../../../../../redux/reducers/gameSlice';

interface IAction {
  x: number;
  image?: string;
  action: any;
}

function CombatActions({ hero, updateHero }: any) {

  const performAttack = async (attackPower: "low" | "medium" | "strong") => {
    const response = await questActionAttack({ attackPower });
    if (response.status !== 200) return console.log(response.data);
    fetchHero(updateHero);
  };

  const usePotion = async () => {
    const response = await questActionPotion();
    if (response.status !== 200) return console.log(response.data);
    fetchHero(updateHero);
  }

  const potionImage = () => {
    const potionSlot = hero.equipment.find((item: any) => item.type === "potion");  
    if (!potionSlot.item) return null;
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
      <ActionButton x={225} image={strongAttack} action={""} />
      <ActionButton x={300} image={strongAttack} action={""} />
      <ActionButton x={375} image={potionImage()} action={usePotion} />
    </Container>
  );
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateHero: (data: any) => dispatch(setHero(data)),
  };
};

export default connect(null, mapDispatchToProps)(CombatActions);