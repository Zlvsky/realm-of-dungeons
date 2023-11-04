import { useState, useCallback, useEffect } from "react";
import { Container, Graphics, Sprite } from "@pixi/react";
import portalsbg from "../../../assets/images/game-world/portals.png";
import { useDispatch, useSelector } from "react-redux";
import { getHero, setHero } from "../../../redux/reducers/gameSlice";
import { realmsData } from "../../../data/realms/data/realmsData";
import RealmInfo from "./components/RealmInfo";
import TravelInfo from "./components/TravelInfo";
import Destinations from "./components/Destinations";
import { unlockRealmRequest } from "../../../client/appClient";
import fetchHero from "../../../utils/fetchers/fetchHero";

const canvasWidth = 1316;
const canvasHeight = 937;
const rectWidth = 700;
const rectHeight = 600;

function Portals() {
  const hero = useSelector(getHero)!;
  const dispatch = useDispatch();
  const [realm, setRealm] = useState(realmsData(hero.realms.currentRealm));
  const startX = (canvasWidth - rectWidth) / 2;
  const startY = (canvasHeight - rectHeight) / 2;

  const updateHero = (data: any) => {
    dispatch(setHero(data));
  };

  useEffect(() => {
    const handleUnlockRealm = async () => {
      const response = await unlockRealmRequest();
      if (response.status !== 200) return false;
      fetchHero(updateHero);
      return true;
    };
    handleUnlockRealm();
  }, []);

  const portalsFrame = useCallback((g: any) => {
    g.clear();

    g.beginFill(0x29221c, 0.9);
    g.lineStyle(4, 0x29221c, 1);

    g.moveTo(0, 0);
    g.lineTo(rectWidth, 0);
    g.lineTo(rectWidth, rectHeight);
    g.lineTo(0, rectHeight);
    g.lineTo(0, 0);

    g.endFill();
  }, []);

  return (
    <Container position={[0, 2]}>
      <Sprite image={portalsbg} width={1316} height={935} />
      <Container position={[startX, startY]}>
        <Graphics draw={portalsFrame} zIndex={0} />
        <Destinations
          availableRealms={hero.realms.availableRealms}
          realm={realm}
          setRealm={setRealm}
        />
        <RealmInfo realm={realm} />
        <TravelInfo realm={realm} currentRealm={hero.realms.currentRealm} />
      </Container>
    </Container>
  );
}

export default Portals;
