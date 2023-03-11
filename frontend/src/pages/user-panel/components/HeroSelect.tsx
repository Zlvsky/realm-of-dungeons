import React from 'react';
import Button from '../../../components/common/button/Button';
import SubHeader from '../../../components/common/text/SubHeader';

interface HeroSelectInterface {
  hero: {
    id: string;
    name: string;
    class: string;
    level: number;
    avatar: string;
  };
}

function HeroSelect({ hero }: HeroSelectInterface) {

    const handleEnter = () => {

    }

  return (
    <div className="flex row gap-10 max-w-xl">
      <div className="">
        <img src={""} alt="" />
      </div>
      <div className="flex flex-col gap-3 text-left">
        <SubHeader>{hero.name}</SubHeader>
        <p className="text-secondary font-sans">Class: {hero.class}</p>
        <p className="text-secondary font-sans">Level: {hero.level}</p>
        <Button onClick={handleEnter}>ENTER</Button>
      </div>
    </div>
  );
}

export default HeroSelect;