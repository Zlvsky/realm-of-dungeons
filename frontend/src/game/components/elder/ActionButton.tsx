import { Container, Sprite, Text, withFilters } from '@pixi/react';
import IconWithText from '../../../components/common/text/IconWithText';
import { ColorMatrixFilter, TextStyle } from 'pixi.js';
import { changeRealmRequest } from '../../../client/appClient';
import displayError from '../../../utils/notifications/errors';
import fetchHero from '../../../utils/fetchers/fetchHero';
import { setHero } from '../../../redux/reducers/gameSlice';
import { useDispatch } from 'react-redux';

import GoldIcon from "../../../assets/images/icons/gui/gold-icon.png";
import AcceptBtn from "../../../assets/images/acceptbtn.png";

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

function ActionButton({ realm, currentRealm }: any) {
  const dispatch = useDispatch();
  const isCurrentRealm = currentRealm === realm?.value;

  const updateHero = (data: any) => {
    dispatch(setHero(data));
  };

  const handleAcceptDestination = async () => {
    if (isCurrentRealm) return;
    const response = await changeRealmRequest(realm?.value);
    if (response.status !== 200) return displayError(dispatch, response);
    fetchHero(updateHero);
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
        x={190}
        y={-63}
        cursor={isCurrentRealm ? "default" : "pointer"}
        interactive={true}
        onpointerdown={handleAcceptDestination}
      />
    </DisabledFilter>
  );

  return (
    <Container position={[720, 660]}>
      <Text text={`Fee:`} x={0} y={0} style={new TextStyle(textStyle)} />
      <IconWithText
        text={realm?.fee?.toString()}
        image={GoldIcon}
        position={[50, -6]}
        textStyle={textStyle}
      />
      <AcceptButton />
    </Container>
  );
}

export default ActionButton;