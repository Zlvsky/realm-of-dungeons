import { Container, Sprite, Text } from "@pixi/react";
import { TextStyle } from "pixi.js";
import IconWithText from "../../../../components/common/text/IconWithText";
import GoldIcon from "../../../../assets/images/icons/gui/gold-icon.png";
import AcceptBtn from "../../../../assets/images/acceptbtn.png";
import { setHero } from "../../../../redux/reducers/gameSlice";
import { useDispatch } from "react-redux";
import fetchHero from "../../../../utils/fetchers/fetchHero";

const textStyle: any = {
  align: "left",
  fontFamily: "MedievalSharp",
  fontSize: 20,
  letterSpacing: 1,
  fill: ["#d1d1d1"],
};

function TrainerAction() {

    const dispatch = useDispatch();

    const updateHero = (data: any) => {
      dispatch(setHero(data));
    };

    const handleAcceptTraining = async () => {
        await fetchHero(updateHero);
    }

    const TravelFee = () => {
      return (
        <Container>
          <Text text={`Fee:`} x={0} y={0} style={new TextStyle(textStyle)} />
          <IconWithText
            text={"2,05"}
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