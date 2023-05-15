import { getUserCharacter } from "../../client/appClient";
import { setHero } from "../../redux/reducers/gameSlice";

const fetchHero = async (dispatch: any) => {
  const heroId = localStorage.getItem("hero");
  if (heroId === null) return;
  const response = await getUserCharacter(heroId);
  if (response.status !== 200)
    return () => {
      console.log(response.data)
    };
  dispatch(setHero(response.data));
};

export default fetchHero;