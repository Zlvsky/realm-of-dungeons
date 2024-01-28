import { Container } from "@pixi/react-animated";
import HoveredLabel from "../../../components/ui/HoveredLabel";

function BuildingLabels({setCurrentMerchant}: any) {

  return (
    <Container position={[0, 0]} interactive>
      <HoveredLabel
        x={270}
        y={470}
        hitArea={[-130, -100, 350, 270]}
        text="Armory"
        onclick={() => setCurrentMerchant("Armourer")}
      />
      <HoveredLabel
        x={810}
        y={430}
        hitArea={[-50, 0, 200, 270]}
        text="Alchemist"
        onclick={() => setCurrentMerchant("Alchemist")}
      />
      <HoveredLabel
        x={1030}
        y={450}
        hitArea={[-40, -50, 350, 270]}
        text="Magic Shop"
        onclick={() => setCurrentMerchant("Witch")}
      />
    </Container>
  );
}

export default BuildingLabels;
