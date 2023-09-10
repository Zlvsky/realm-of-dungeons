import { useState, useEffect } from "react";
import Header from "../../components/common/text/Header";
import FullWrapper from "../../components/layouts/page-wrappers/FullWrapper";
import arrow from "../../assets/images/arrow_white.png";
import Form from "../../components/common/forms/Form";
import Input from "../../components/common/forms/Input";
import { createCharacter } from "../../client/appClient";
import { useNavigate } from "react-router-dom";
import getClassDetails from "./helpers/ClassesData";

function CreateHero() {
  const [nickname, setNickname] = useState("");
  const [heroIndex, setHeroIndex] = useState<1 | 2 | 3>(1);
  const [currentHeroData, setCurrentHeroData] = useState<any>({});
  const navigate = useNavigate();

  const heroClass = {
    1: "warrior",
    2: "archer",
    3: "mage",
  };

  useEffect(() => {
    setCurrentHeroData(getClassDetails(heroClass[heroIndex]));
  }, [heroIndex]);

  const handleChangeClass = (target: any) => {
    if (heroIndex + target > 3) return setHeroIndex(1);
    if (heroIndex + target < 1) return setHeroIndex(3);
    setHeroIndex((prev) => prev + target);
  };

  const Stats = () => {
    return (
      <div className="flex flex-col items-center justify-center mt-5">
        <span className="font-sans text-lg text-secondary">
          Strength: {currentHeroData?.statistics?.strength}
        </span>
        <span className="font-sans text-lg text-secondary">
          Dexterity: {currentHeroData?.statistics?.dexterity}
        </span>
        <span className="font-sans text-lg text-secondary">
          Condition: {currentHeroData?.statistics?.condition}
        </span>
        <span className="font-sans text-lg text-secondary">
          Intelligence: {currentHeroData?.statistics?.intelligence}
        </span>
        <span className="font-sans text-lg text-secondary">
          Wisdom: {currentHeroData?.statistics?.wisdom}
        </span>
        <span className="font-sans text-lg text-secondary">
          Charisma: {currentHeroData?.statistics?.charisma}
        </span>
      </div>
    );
  };

  const handleCreateHero = async () => {
    const data = {
      nickname: nickname,
      class: heroClass[heroIndex],
    };
    const response = await createCharacter(data);
    if (response.status !== 200) return console.log(response.data);
    navigate("/start");
  };

  return (
    <FullWrapper>
      <div className="flex flex-col justify-center items-center max-w-xl mx-auto min-h-screen">
        <div className="w-full text-center mt-28">
          <Header>Create your hero</Header>
        </div>
        <div className="w-full">
          <div className="border border-secondary rounded-md bg-black bg-opacity-30 mb-20 mt-10">
            <div className="flex row justify-between items-center bg-gradient-to-b from-gradientBrownTop to-gradientBrownBottom rounded-b-md px-6 py-3">
              <div
                className="rotate-[270deg] cursor-pointer"
                onClick={() => handleChangeClass(-1)}
              >
                <img src={arrow} alt="" />
              </div>
              <span className="font-sans text-gray-300 text-lg capitalize">
                {heroClass[heroIndex]}
              </span>
              <div
                className="rotate-90 cursor-pointer"
                onClick={() => handleChangeClass(1)}
              >
                <img src={arrow} alt="" />
              </div>
            </div>
            <div className="px-12 pb-20 flex flex-col items-center gap-5">
              <Form
                id="createhero"
                onSubmit={handleCreateHero}
                submitBtn={"CREATE NEW HERO"}
                bgColor="secondary"
              >
                <img
                  src={currentHeroData.avatar}
                  alt="warrior"
                  width={250}
                  loading="lazy"
                />
                <Stats />
                <Input
                  label=""
                  name="nickname"
                  placeholder="Enter your nickname"
                  divClassName="my-8"
                  type="text"
                  value={nickname}
                  onChange={(e: any) => setNickname(e.target.value)}
                  // onKeyPress={inputOnlyLetters}
                  // error={errors?.fullName}
                  required
                />
              </Form>
            </div>
          </div>
        </div>
      </div>
    </FullWrapper>
  );
}

export default CreateHero;
