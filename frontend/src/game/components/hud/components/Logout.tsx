import { Sprite } from "@pixi/react";
import ExitIcon from "../../../../assets/images/icons/gui/logout.png";

function Logout() {
  const navigateToStart = () => {
    window.location.href = "/start"
  }

  return (
    <Sprite
      image={ExitIcon}
      interactive
      cursor="pointer"
      position={[250, 870]}
      width={60}
      height={60}
      onclick={navigateToStart}
    />
  );
}

export default Logout;
