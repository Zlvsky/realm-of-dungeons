import { useState, useEffect } from "react";
import { Container, Text, TilingSprite } from "@pixi/react";
import BgPattern from "../../../assets/images/dark_wall.png";
import merchantsData from "../merchants/data/merchantsData";
import { setHero } from "../../../redux/reducers/gameSlice";
import { connect } from "react-redux";
import Avatar from "./components/Avatar";
import HeroInventorySlots from "./components/hero/HeroInventorySlots";

interface IMerchantShop {
    currentMerchant: string;
    game: any;
    updateHero: any;
}

function MerchantShop({ currentMerchant, game, updateHero }: IMerchantShop) {
  const hero = game.hero;
  const [merchantData, setMerchantData] = useState<any>(merchantsData.find(
      (el) => el.name === currentMerchant
    ));
  console.log(merchantData)
  
  return (
    <Container position={[0, 2]}>
      <TilingSprite
        image={BgPattern}
        width={1315}
        height={935}
        tilePosition={{ x: 0, y: 0 }}
      />
      <Container position={[100, 170]}>
        <Avatar image={hero.avatar} name="You" />
        <HeroInventorySlots />
      </Container>

      {currentMerchant && (
        <Container position={[795, 170]}>
          <Avatar image={merchantData.image} name={merchantData.name} />
          <HeroInventorySlots />
        </Container>
      )}
    </Container>
  );
}

const mapStateToProps = ({ game }: any) => ({ game });

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateHero: (data: any) => dispatch(setHero(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MerchantShop);
