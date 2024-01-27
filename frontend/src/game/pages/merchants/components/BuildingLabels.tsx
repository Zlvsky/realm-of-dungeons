import { Container } from "@pixi/react-animated";
import HoveredLabel from "../../../components/ui/HoveredLabel";

function BuildingLabels({setCurrentMerchant}: any) {

  return (
    <Container position={[0, 0]} interactive>
      <HoveredLabel
        x={170}
        y={400}
        hitArea={[-130, -50, 350, 270]}
        text="Armory"
        onclick={() => setCurrentMerchant("Armourer")}
      />
      <HoveredLabel
        x={900}
        y={380}
        hitArea={[-50, -100, 350, 270]}
        text="Alchemist"
        onclick={() => setCurrentMerchant("Alchemist")}
      />
      <HoveredLabel
        x={1130}
        y={490}
        hitArea={[-130, -50, 350, 270]}
        text="Magic Shop"
        onclick={() => setCurrentMerchant("Witch")}
      />
    </Container>
  );
}

export default BuildingLabels;
