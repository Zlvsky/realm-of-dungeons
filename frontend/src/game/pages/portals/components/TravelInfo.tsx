import { Container, Sprite, Text, withFilters } from "@pixi/react";
import { ColorMatrixFilter, TextStyle } from "pixi.js";
import IconWithText from "../../../../components/common/text/IconWithText";
import GoldIcon from "../../../../assets/images/icons/gui/gold-icon.png";
import AcceptBtn from "../../../../assets/images/acceptbtn.png";
import { changeRealmRequest } from "../../../../client/appClient";
import fetchHero from "../../../../utils/fetchers/fetchHero";
import { useDispatch } from "react-redux";
import { setHero } from "../../../../redux/reducers/gameSlice";
import displayError from "../../../../utils/notifications/errors";

const textStyle: any = {
  align: "left",
  fontFamily: "MedievalSharp",
  fontSize: 20,
  letterSpacing: 1,
  fill: ["#ffffff"],
};

const DisabledFilter: any = withFilters(Container, {
  matrix: ColorMatrixFilter,
});

function TravelInfo({ realm, currentRealm, unlockedRealms }: any) {
  const dispatch = useDispatch();
  const isCurrentRealm = currentRealm === realm?.value;
  const isUnlocked = unlockedRealms.includes(realm.value);

  const updateHero = (data: any) => {
    dispatch(setHero(data));
  };

  const handleAcceptDestination = async () => {
    if (isCurrentRealm) return;
    const response = await changeRealmRequest(realm?.value);
    if (response.status !== 200) return displayError(dispatch, response)
    fetchHero(updateHero);
  };

  const TravelFee = () => {
    return (
      <Container>
        <Text text={`Fee:`} x={0} y={0} style={new TextStyle(textStyle)} />
        <IconWithText
          text={realm?.fee?.toString()}
          image={GoldIcon}
          position={[50, -6]}
          textStyle={textStyle}
        />
      </Container>
    );
  };

  const AcceptButton = () => (
    <DisabledFilter
      matrix={{ enabled: true }}
      apply={
        isCurrentRealm ? ({ matrix }: any) => matrix.blackAndWhite() : undefined
      }
    >
      <Sprite
        image={AcceptBtn}
        width={150}
        height={150}
        x={300}
        y={-63}
        cursor={isCurrentRealm ? "default" : "pointer"}
        interactive={true}
        onpointerdown={handleAcceptDestination}
      />
    </DisabledFilter>
  );

  const UnlockInfo = () => {
    return (
      <Container>
        <Text
          text={`Reach ${realm?.unlockLevel} level & `}
          x={0}
          y={-20}
          style={new TextStyle(textStyle)}
        />
        <Text
          text={`Find the orb on a quest `}
          x={0}
          y={0}
          style={new TextStyle(textStyle)}
        />
        <Sprite image={realm.orbImage} width={50} height={50} x={290} y={-23} />
      </Container>
    );
  }

  return (
    <Container position={[220, 530]}>
      {isUnlocked ? (
        <>
          <TravelFee />
          <AcceptButton />
        </>
      ) : (
        <UnlockInfo />
      )}
    </Container>
  );
}

export default TravelInfo;