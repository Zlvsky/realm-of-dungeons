import React from 'react';
import { Stage, Container, Sprite, Text, Graphics } from "@pixi/react";
import { useSelector } from 'react-redux';
import { getHero } from '../../../../redux/reducers/gameSlice';
import ItemSlot from './ItemSlot';
import Item from './Item';

function HeroEquipment() {
    const hero = useSelector(getHero);
    const handleDrop = () => {
        console.log(123)
    }
    return (
      <Container position={[100, 150]}>
        <Container>
          <Sprite
            image={hero?.avatar}
            position={[120, 0]}
            width={250}
            height={250}
          />
          <ItemSlot x={0} y={0} onDrop={handleDrop} />
          <ItemSlot x={0} y={100} onDrop={handleDrop} />
          <Item />
        </Container>
      </Container>
    );
}

export default HeroEquipment;