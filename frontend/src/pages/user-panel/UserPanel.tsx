import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCharacters, getUserDetails } from '../../client/appClient';
import Button from '../../components/common/button/Button';
import Header from '../../components/common/text/Header';
import FullWrapper from '../../components/layouts/page-wrappers/FullWrapper';
import HeroSelect from './components/HeroSelect';
import Footer from '../../components/footer/Footer';

function UserPanel() {
    const [userData, setUserData] = useState<any>([]);
    const [userCharacter, setUserCharacters] = useState<any>([]);

    useEffect(() => {
      const fetchCharacters = async () => {
        const response = await getCharacters();
        if (response.status !== 200) return console.log(response.data);
        setUserCharacters(response.data);
      }
      const getUserData = async () => {
        const response = await getUserDetails();
        if(response.status !== 200) return console.log(response.data);
        setUserData(response.data);
      }
      getUserData();
      fetchCharacters();
    }, [])

    const ListedHeroes = () => {
        return (
          <div className="flex flex-col gap-10 my-10">
            {userCharacter?.map((hero: any, index: number) => (
              <HeroSelect hero={hero} key={index} />
            ))}
          </div>
        );
    }

    return (
      <FullWrapper>
        <div className="flex flex-col justify-center items-center max-w-lg mx-auto min-h-screen mb-24">
          <div className="w-full text-center mt-28">
            <Header>Welcome {userData.accountname}</Header>
            <p className="text-secondary font-sans text-lg mt-10">
              Choose your hero
            </p>
          </div>
          <div className="w-full">
            <ListedHeroes />
            <div className="flex justify-center">
              <Link to="/createhero">
                <Button bgColor="borderBrown">CREATE NEW HERO</Button>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </FullWrapper>
    );
}

export default UserPanel;