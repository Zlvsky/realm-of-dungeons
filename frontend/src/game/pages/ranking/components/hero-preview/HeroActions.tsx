import { useState } from 'react';
import { Container, Sprite, Text } from '@pixi/react';
import invbtn from "../../../../../assets/images/hud/guildinvite.png";
import InfoPopup, { InfoPopupTextStyle } from '../../../../components/ui/InfoPopup';
import { useDispatch, useSelector } from 'react-redux';
import { getHero } from '../../../../../redux/reducers/gameSlice';
import { inviteToGuildRequest } from '../../../../../client/appClient';
import displayError from '../../../../../utils/notifications/errors';

function HeroActions({ heroId, currentHeroId }: any) {
    const [itemHovered, setItemHovered] = useState(false);
    
    const dispatch = useDispatch();

    const hero = useSelector(getHero);

    const handleShowPopup = () => setItemHovered(true);
    const handleHidePopup = () => setItemHovered(false);

    const textStyle = InfoPopupTextStyle();

    const handleInvitePlayer = async () => {
        const response = await inviteToGuildRequest(heroId);
        if (response.status !== 200) return displayError(dispatch, response);
    }

    if (hero?.guild?.memberType !== "LEADER") return null;

    if (heroId === currentHeroId) return null;

    return (
      <Container position={[120, 0]}>
        <Sprite
          image={invbtn}
          width={80}
          height={80}
          cursor="pointer"
          interactive={true}
          onpointerenter={handleShowPopup}
          onpointerleave={handleHidePopup}
          onpointerdown={handleInvitePlayer}
        />
        <InfoPopup position={[70, 70]} height={50} show={itemHovered}>
          <Container>
            <Text text={"Invite this player to your guild"} style={textStyle} />
          </Container>
        </InfoPopup>
      </Container>
    );
}

export default HeroActions;