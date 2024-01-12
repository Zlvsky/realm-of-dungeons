import { Sprite } from "@pixi/react";
import DiscordIcon from "../../../../assets/images/icons/gui/discord.png";

function Discord() {
  const openDiscrod = () => {
    window.open("https://discord.gg/KDpZWzk8", "__blank");
  };

  return (
    <Sprite
      image={DiscordIcon}
      interactive
      cursor="pointer"
      position={[20, 880]}
      width={40}
      height={40}
      onpointerdown={openDiscrod}
    />
  );
}

export default Discord;
