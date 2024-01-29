import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Text } from "@pixi/react";
import { TextStyle } from "pixi.js";
import { getHero, setHero } from "../../../../redux/reducers/gameSlice";
import { realmsData } from "../../../../data/realms/data/realmsData";
import NpcPopup from "../../../components/ui/NpcPopup";
import fetchHero from "../../../../utils/fetchers/fetchHero";
import { unlockRealmRequest } from "../../../../client/appClient";
import ActionButton from "../../../components/elder/ActionButton";
import RealmPassess from "../../../components/elder/RealmPassess";
import RealmDescription from "../../../components/elder/RealmDescription";

const halfWidth = 1180 / 2 - 60;

function ElderNpc({ setCurrentNpc }: any) {
  const hero = useSelector(getHero)!;
  const dispatch = useDispatch();

  const [realm, setRealm] = useState(realmsData(hero.realms.currentRealm));
  
  const heroUnlockedRealms = hero.realms.availableRealms;

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

  return (
    <NpcPopup
      setTrigger={setCurrentNpc}
      npc={"elder.jpg"}
      title={"Change realm destinations"}
      description={
        "Ah, traveler of unknown lands. Does fate weave your path towards realms yet unseen?\nRemember that every adventurer must have Realm Pass granting entry to lands."
      }
    >
      <>
        <Text
          x={halfWidth}
          y={160}
          anchor={[0.5, 0]}
          text={"Exchange your realm pass"}
          style={
            new TextStyle({
              align: "center",
              fontFamily: "Almendra",
              fontSize: 29,
              fill: ["#dfdfdf"],
            })
          }
        />
        <RealmPassess realm={realm} setRealm={setRealm} />
        <RealmDescription realm={realm} />
        <ActionButton realm={realm} currentRealm={hero.realms.currentRealm} />
      </>
    </NpcPopup>
  );
}

export default ElderNpc;
