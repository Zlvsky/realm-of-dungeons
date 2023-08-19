import { useState, useEffect } from "react";
import { Container, Text, TilingSprite } from "@pixi/react";
import BgPattern from "../../../assets/images/dark_wall.png";
import merchantsData from "../merchants/data/merchantsData";

interface IMerchantShop {
    currentMerchant: string;
}

function MerchantShop({ currentMerchant }: IMerchantShop) {
  const [merchantAvatar, setMerchantAvatar] = useState<null | undefined | string>(null);
  
  useEffect(() => {
    const currentMerchantData = merchantsData.find(el => el.name === currentMerchant);
    setMerchantAvatar(currentMerchantData?.image);
  }, []);


  return (
    <Container position={[0, 2]}>
      <TilingSprite
        image={BgPattern}
        width={1315}
        height={935}
        tilePosition={{ x: 0, y: 0 }}
      />
    </Container>
  );
}

export default MerchantShop;
