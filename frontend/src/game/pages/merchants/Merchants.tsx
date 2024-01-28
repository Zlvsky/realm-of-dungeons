import { useState } from "react"; 
import { Container, Sprite } from "@pixi/react";
import merchantsBg from "../../../assets/images/game-world/merchants.jpg"; 
import BuildingLabels from "./components/BuildingLabels";
import MerchantShop from "./components/MerchantShop";

function Merchants() {
  const [currentMerchant, setCurrentMerchant] = useState("");

  return (
    <Container position={[0, 2]}>
      <Sprite image={merchantsBg} width={1316} height={935} />
      {currentMerchant === "" && (
        <BuildingLabels setCurrentMerchant={setCurrentMerchant} />
      )}

      <MerchantShop
        currentMerchant={currentMerchant}
        setCurrentMerchant={setCurrentMerchant}
      />
    </Container>
  );
}

export default Merchants;