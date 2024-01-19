import { Container, Text } from "@pixi/react";
import InfoPopup, { InfoPopupTextStyle } from "../ui/InfoPopup";

const ActionInfoPopups = ({ hero, currentActionHovered }: any) => {
  const heroMinDmg = hero.updatedValues.minDmg;
  const heroMaxDmg = hero.updatedValues.maxDmg;

  const lowDmgModifier = 0.5;
  const mediumDmgModifier = 0.75;
  const strongDmgModifier = 1;

  const lowMinDmg = Math.round(heroMinDmg * lowDmgModifier);
  const lowMaxDmg = Math.round(heroMaxDmg * lowDmgModifier);

  const normalMinDmg = Math.round(heroMinDmg * mediumDmgModifier);
  const normalMaxDmg = Math.round(heroMaxDmg * mediumDmgModifier);

  const strongMinDmg = Math.round(heroMinDmg * strongDmgModifier);
  const strongMaxDmg = Math.round(heroMaxDmg * strongDmgModifier);

  const potionSlot = hero.equipment.find((item: any) => item.type === "potion")?.item;

  const textStyle = InfoPopupTextStyle();

  return (
    <>
      {/* ATTACKS */}
      <InfoPopup position={[35, -20]} show={currentActionHovered === 1}>
        <Container>
          <Text text="Quick Attack" style={textStyle} />
          <Text y={30} text={`Min dmg: ${lowMinDmg}`} style={textStyle} />
          <Text y={50} text={`Max dmg: ${lowMaxDmg}`} style={textStyle} />
          <Text y={80} text={`Chance to hit: 90%`} style={textStyle} />
        </Container>
      </InfoPopup>
      <InfoPopup position={[110, -20]} show={currentActionHovered === 2}>
        <Container>
          <Text text="Normal Attack" style={textStyle} />
          <Text y={30} text={`Min dmg: ${normalMinDmg}`} style={textStyle} />
          <Text y={50} text={`Max dmg: ${normalMaxDmg}`} style={textStyle} />
          <Text y={80} text={`Chance to hit: 85%`} style={textStyle} />
        </Container>
      </InfoPopup>
      <InfoPopup position={[185, -20]} show={currentActionHovered === 3}>
        <Container>
          <Text text="Strong Attack" style={textStyle} />
          <Text y={30} text={`Min dmg: ${strongMinDmg}`} style={textStyle} />
          <Text y={50} text={`Max dmg: ${strongMaxDmg}`} style={textStyle} />
          <Text y={80} text={`Chance to hit: 70%`} style={textStyle} />
        </Container>
      </InfoPopup>
      {/* SPELLS */}
      <InfoPopup position={[260, -20]} show={currentActionHovered === 4}>
        <Container>
          <Text text="Spell Slot #1" style={textStyle} />
          <Text y={30} text={`Empty`} style={textStyle} />
        </Container>
      </InfoPopup>
      <InfoPopup position={[335, -20]} show={currentActionHovered === 5}>
        <Container>
          <Text text="Spell Slot #2" style={textStyle} />
          <Text y={30} text={`Empty`} style={textStyle} />
        </Container>
      </InfoPopup>
      {/* POTION */}
      <InfoPopup position={[410, -20]} show={currentActionHovered === 6}>
        <Container>
          <Text
            text={potionSlot ? "Health Potion" : "Potion Slot"}
            style={textStyle}
          />
          <Text
            y={30}
            text={potionSlot ? "Use to heal wounds" : "Empty"}
            style={textStyle}
          />
        </Container>
      </InfoPopup>
    </>
  );
};

export default ActionInfoPopups;