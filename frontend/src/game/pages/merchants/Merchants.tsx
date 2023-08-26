import { useState } from "react"; 
import { Container, Text, TilingSprite } from "@pixi/react";
import BgPattern from "../../../assets/images/dark_wall.png"; 
import MerchantsText from "./components/MerchantsText";
import merchantsData from "./data/merchantsData";
import SingleMerchant from "./components/SingleMerchant";
import MerchantShop from "../merchant-shop/MerchantShop";

function Merchants() {
    const [currentMerchant, setCurrentMerchant] = useState("");

    if (currentMerchant.length > 0) return <MerchantShop currentMerchant={currentMerchant} />

    return (
      <Container position={[0, 2]}>
        <TilingSprite
          image={BgPattern}
          width={1315}
          height={935}
          tilePosition={{ x: 0, y: 0 }}
        />
        <MerchantsText />
        <Container position={[2, 320]}>
            {merchantsData.map((merchant, index) => (
                <SingleMerchant key={index} position={[220 * index, 0]} name={merchant.name} image={merchant.image} setCurrentMerchant={setCurrentMerchant} />
            ))}
        </Container>
      </Container>
    );
}

export default Merchants;