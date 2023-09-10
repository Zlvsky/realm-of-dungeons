import { useNavigate } from 'react-router-dom';
import Button from '../../../components/common/button/Button';
import SubHeader from '../../../components/common/text/SubHeader';
import { IHeroProp } from '../../../interfaces/ComponentsInterfaces';

function HeroSelect({ hero }: IHeroProp) {
  const navigate = useNavigate();
  const handleEnter = () => {
    localStorage.setItem("hero", hero._id);
    navigate("/game");
  };

  return (
    <div className="flex row gap-10 max-w-xl justify-center">
      <div className="">
        <img src={hero.avatar} alt="" width={200} />
      </div>
      <div className="flex flex-col gap-3 text-left">
        <SubHeader>{hero.nickname}</SubHeader>
        <p className="text-secondary font-sans">Class: {hero.class}</p>
        <p className="text-secondary font-sans">
          Level: {hero.progression.level}
        </p>
        <Button onClick={handleEnter}>ENTER</Button>
      </div>
    </div>
  );
}

export default HeroSelect;