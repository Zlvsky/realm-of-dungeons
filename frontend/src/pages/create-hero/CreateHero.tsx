import React, { useState, useEffect } from "react";
import Button from "../../components/common/button/Button";
import Header from "../../components/common/text/Header";
import FullWrapper from "../../components/layouts/page-wrappers/FullWrapper";
import arrow from "../../assets/images/arrow_white.png";
import warrior from "../../assets/images/warrior.png";
import Form from "../../components/common/forms/Form";
import Input from "../../components/common/forms/Input";

function CreateHero() {
  const [nickname, setNickname] = useState("");

  const Stats = () => {
    return (
      <div className="flex flex-col items-center justify-center mt-5">
        <span className="font-sans text-lg text-secondary">Strength: 10</span>
        <span className="font-sans text-lg text-secondary">Dexterity: 5</span>
        <span className="font-sans text-lg text-secondary">Condition: 15</span>
        <span className="font-sans text-lg text-secondary">Intelligence: 4</span>
        <span className="font-sans text-lg text-secondary">Wisdom: 2</span>
        <span className="font-sans text-lg text-secondary">Charisma: 8</span>
      </div>
    );
  }

  const handleCreateHero = () => {

  }

  return (
    <FullWrapper>
      <div className="flex flex-col justify-center items-center max-w-xl mx-auto min-h-screen">
        <div className="w-full text-center mt-28">
          <Header>Create your hero</Header>
        </div>
        <div className="w-full">
          <div className="border border-secondary rounded-md bg-black bg-opacity-30 mb-20 mt-10">
            <div className="flex row justify-between items-center bg-gradient-to-b from-gradientBrownTop to-gradientBrownBottom rounded-b-md px-6 py-3">
              <div className="rotate-[270deg]">
                <img src={arrow} alt="" />
              </div>
              <span className="font-sans text-gray-300 text-lg">Warrior</span>
              <div className="rotate-90">
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
                <img src={warrior} alt="warrior" width={250} loading='lazy'/>
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
