import { Container, Graphics, Sprite, Text } from "@pixi/react";
import { TextStyle } from "pixi.js";
import { useCallback } from "react";
import { GuildProp } from "../../../../../interfaces/GuildInterface";
import goldIcon from "../../../../../assets/images/icons/gui/gold-icon.png";
import IconWithText from "../../../../../components/common/text/IconWithText";
import plusBtn from "../../../../../assets/images/plusbtn.png";

const rectWidth = 500;
const rectHeight = 500;

const HeaderStyle = new TextStyle({
  align: "center",
  fontFamily: "Almendra",
  fontSize: 26,
  letterSpacing: 1,
  fill: ["#ffffff"],
});

const textStyle = new TextStyle({
  align: "center",
  fontFamily: "Almendra",
  fontSize: 26,
  letterSpacing: 1,
  fill: ["#bcbcbc"],
});

function GuildInfo({ guild }: GuildProp) {
  const createFrame = useCallback((g: any) => {
    g.clear();

    g.beginFill(0x2c2c2c, 0.3);
    g.lineStyle(1, 0x656565, 1);

    g.moveTo(0, 0);
    g.lineTo(rectWidth, 0);
    g.lineTo(rectWidth, rectHeight);
    g.lineTo(0, rectHeight);
    g.lineTo(0, 0);

    g.endFill();
  }, []);

  const BankGuild = () => {
    return (
      <Container position={[0, 320]}>
        <Text
          text={"Guild Bank"}
          x={rectWidth / 2}
          y={30}
          anchor={[0.5, 0]}
          style={HeaderStyle}
        />
        <IconWithText
          text={guild.treasury.gold.toString()}
          image={goldIcon}
          position={[30, 80]}
          imageHeight={35}
          imageWidth={35}
          textX={45}
          imageY={5}
          textStyle={textStyle}
        />
        <Sprite image={plusBtn} width={60} height={60} position={[310, 70]} />
        <IconWithText
          text={"100"}
          image={goldIcon}
          position={[380, 80]}
          imageHeight={35}
          imageWidth={35}
          textX={45}
          imageY={5}
          textStyle={textStyle}
        />
      </Container>
    );
  }

  return (
    <Container position={[420, 100]}>
      <Graphics draw={createFrame} />
      <Text
        text={"Description"}
        x={rectWidth / 2}
        y={30}
        anchor={[0.5, 0]}
        style={HeaderStyle}
      />
      <Text
        text={
          "Suspendisse orci dolor, sodales a tincidunt commodo, euismod id orci. Cras fermentum euismod sem, ac convallis est aliquet non. Morbi volutpat, odio at sollicitudin hendrerit, ligula arcu vestibulum lacus, nec laoreet orci tellus eu erat. Curabitur ut nisl semper, pharetra libero et, sollicitudin nunc. Sed quis quam posuere, vulputate mi eu, semper nisi. Suspendisse tempor dolor ante, in imperdiet mi efficitur non. Nullam lacus purus, interdum blandit nisi nec, volutpat facilisis arcu. Donec efficitur mi in mauris ultricies lacinia. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."
        }
        x={30}
        y={70}
        style={
          new TextStyle({
            align: "left",
            fontFamily: "Almendra",
            fontSize: 18,
            letterSpacing: 1,
            wordWrap: true,
            wordWrapWidth: 460,
            fill: ["#bcbcbc"],
          })
        }
      />
      <BankGuild />
    </Container>
  );
}

export default GuildInfo;
