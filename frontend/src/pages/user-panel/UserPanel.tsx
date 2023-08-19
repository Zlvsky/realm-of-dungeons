import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUserDetails } from '../../client/appClient';
import Button from '../../components/common/button/Button';
import Header from '../../components/common/text/Header';
import FullWrapper from '../../components/layouts/page-wrappers/FullWrapper';
import HeroSelect from './components/HeroSelect';

function UserPanel() {
    const [userData, setUserData] = useState<any>([]);

    useEffect(() => {
      const getUserData = async () => {
        const response = await getUserDetails();
        if(response.status !== 200) return console.log(response.data);
        setUserData(response.data);
      }
      getUserData();
    }, [])

    const ListedHeroes = () => {
        return (
          <div className="flex flex-col gap-10 my-10">
            {userData.characters?.map((hero: any, index: number) => (
              <HeroSelect hero={hero} key={index} />
            ))}
          </div>
        );
    }

    return (
      <FullWrapper>
        <div className="flex flex-col justify-center items-center max-w-lg mx-auto min-h-screen">
          <div className="w-full text-center mt-28">
            <Header>Welcome {userData.accountname}</Header>
            <p className="text-secondary font-sans text-lg mt-10">
              Choose your hero
            </p>
          </div>
          <div className="w-full">
            <ListedHeroes />
            <div className='flex justify-center'>
              <Link to="/createhero">
                <Button bgColor="borderBrown">CREATE NEW HERO</Button>
              </Link>
            </div>
          </div>
        </div>
      </FullWrapper>
    );
}

export default UserPanel;