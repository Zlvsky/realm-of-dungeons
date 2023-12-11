import { getUserCharacter } from "../../client/appClient";

const fetchHero = async (updateHero: any) => {
  const heroId = localStorage.getItem("hero");
  if (heroId === null) return;
  const response = await getUserCharacter(heroId);
  if (response.status !== 200)
    return () => {
      console.log(response.data);
    };
  updateHero(response.data);
};

export default fetchHero;