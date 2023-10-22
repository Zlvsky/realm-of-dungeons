import { useState, useEffect } from "react";
import { Container, Sprite, Text } from "@pixi/react";
import { TextStyle } from "pixi.js";
import IconWithText from "../../../../components/common/text/IconWithText";
import GoldIcon from "../../../../assets/images/icons/gui/gold-icon.png";
import AcceptBtn from "../../../../assets/images/acceptbtn.png";
import { getHero, setHero } from "../../../../redux/reducers/gameSlice";
import { useDispatch, useSelector } from "react-redux";
import fetchHero from "../../../../utils/fetchers/fetchHero";
import { trainerFeeRequest, trainerTrainRequest } from "../../../../client/appClient";

const textStyle: any = {
  align: "left",
  fontFamily: "MedievalSharp",
  fontSize: 20,
  letterSpacing: 1,
  fill: ["#d1d1d1"],
};

const getCurrentStat = (currentTrainer: string) => {
  switch (currentTrainer) {
    case "Melee Trainer":
      return "MELEE";
    case "Distance Trainer":
      return "DISTANCE";
    case "Magic Trainer":
      return "MAGIC";
    case "Resistance Trainer":
      return "RESISTANCE";
  }
}

function TrainerAction({ currentTrainer }: {currentTrainer: string} ) {
  const [fee, setFee] = useState("");

  const currentStat = getCurrentStat(currentTrainer)!;

  const hero = useSelector(getHero);

  const dispatch = useDispatch();

  const updateHero = (data: any) => {
    dispatch(setHero(data));
  };

  const handleFetchFee = async () => {
    const response = await trainerFeeRequest(currentStat);
    if (response.status !== 200) return console.log(response.data);
    setFee(response.data.fee.toFixed(2));
  };

  const handleAcceptTraining = async () => {
    const response = await trainerTrainRequest(currentStat);
    if (response.status !== 200) return console.log(response.data);
    await fetchHero(updateHero);
  };

  useEffect(() => {
    handleFetchFee();
  }, [hero]);

  const TravelFee = () => {
    return (
      <Container>
        <Text text={`Fee:`} x={0} y={0} style={new TextStyle(textStyle)} />
        <IconWithText
          text={fee}
          image={GoldIcon}
          position={[50, -6]}
          textStyle={textStyle}
        />
      </Container>
    );
  };

  const AcceptButton = () => (
    <Sprite
      image={AcceptBtn}
      width={150}
      height={150}
      x={300}
      y={-63}
      cursor={"pointer"}
      interactive={true}
      onclick={handleAcceptTraining}
    />
  );

  return (
    <Container position={[50, 520]}>
      <TravelFee />
      <AcceptButton />
    </Container>
  );
}

export default TrainerAction;