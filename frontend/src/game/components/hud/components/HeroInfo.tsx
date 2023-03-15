import React from 'react';
import { Stage, Container, Sprite, Text, Graphics } from "@pixi/react";
import { useSelector } from 'react-redux';
import { getHero } from '../../../../redux/reducers/gameSlice';

function HeroInfo() {
    const hero = useSelector(getHero);
    const RenderAvatar = () => {
        if(!hero.avatar) return <></>
        return (
            <Sprite 
                image={hero?.avatar}
                position={[0, 30]}
                width={100} 
                height={100}
            />
        )
    }
    
    return (
        <Container position={[0,0]} >
            <RenderAvatar />
        </Container>
    );
}

export default HeroInfo;