import { useState, useEffect } from "react";
import { Container, Text, TilingSprite } from "@pixi/react";
import BgPattern from "../../../assets/images/dark_wall.png";
import merchantsData from "../merchants/data/merchantsData";
import { setHero } from "../../../redux/reducers/gameSlice";
import { connect } from "react-redux";
import Avatar from "./components/Avatar";
import HeroInventorySlots from "./components/hero/HeroInventorySlots";
import ItemPreview from "../../components/items/item-preview/ItemPreview";
import HeroItems from "./components/hero/HeroItems";

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
  const [currentItem, setCurrentItem] = useState<any>();
    console.log(currentItem)
  return (
    <Container position={[0, 2]}>
      <TilingSprite
        image={BgPattern}
        width={1315}
        height={935}
        tilePosition={{ x: 0, y: 0 }}
      />
      <Container position={[60, 170]}>
        <Avatar image={hero.avatar} name="You" />
        <HeroInventorySlots />
        <HeroItems inventory={hero.inventory} setCurrentItem={setCurrentItem} />
      </Container>

      {currentItem && (
        <ItemPreview
          position={[495, 80]}
          itemData={currentItem.item}
          price={40}
          action={currentItem?.slotIndex ? "BUY" : "SELL"}
        />
      )}

      {currentMerchant && (
        <Container position={[835, 170]}>
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
