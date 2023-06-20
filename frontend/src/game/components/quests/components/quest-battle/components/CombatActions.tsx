import { Container, Graphics, Sprite } from '@pixi/react';
import lowAttack from "../../../../../../assets/images/combat/combat-actions/low.png"
import mediumAttack from "../../../../../../assets/images/combat/combat-actions/medium.png"
import strongAttack from "../../../../../../assets/images/combat/combat-actions/strong.png"
import { calcDamage } from '../utils/combatUtils';

interface IAction {
  x: number;
  image: string;
  action: any;
}

function CombatActions({ heroValues }: any) {
  console.log(heroValues);
  const performAttack = (chanceToHit: number, powerIndex: number) => {
    const randomNumber = Math.random() * 100;
    if (100 - chanceToHit > randomNumber) return console.log("you missed");
    const damage = calcDamage(heroValues.damage / powerIndex, heroValues.damage);
    console.log(damage);
  };

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
        <Sprite
          image={image}
          position={[5, 5]}
          width={60}
          height={60}
          cursor={"pointer"}
          interactive={true}
          onclick={action}
        />
      </Container>
    );
  };

  return (
    <Container position={[400, 850]}>
      <ActionButton x={0} image={lowAttack} action={() => performAttack(80, 5)} />
      <ActionButton x={75} image={mediumAttack} action={() => performAttack(65, 3)} />
      <ActionButton x={150} image={strongAttack} action={() => performAttack(50, 1.5)} />
      <ActionButton x={225} image={strongAttack} action={""} />
      <ActionButton x={300} image={strongAttack} action={""} />
      <ActionButton x={375} image={strongAttack} action={""} />
    </Container>
  );
}

export default CombatActions;