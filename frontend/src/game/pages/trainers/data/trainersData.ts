import meleeAvatar from "../../../../assets/images/trainers/meleeTrainer.jpg";
import distanceAvatar from "../../../../assets/images/trainers/distanceTrainer.jpg";
import magicAvatar from "../../../../assets/images/trainers/magicTrainer.jpg";
import resistanceAvatar from "../../../../assets/images/trainers/resistanceTrainer.jpg";

import meleeBg from "../../../../assets/images/game-world/trainers/meleeTrainerBg.jpg";
import distanceBg from "../../../../assets/images/game-world/trainers/distanceTrainerBg.jpg";
import magicBg from "../../../../assets/images/game-world/trainers/magicTrainerBg.jpg";
import resistanceBg from "../../../../assets/images/game-world/trainers/resistanceTrainerBg.jpg";

const trainersData = [
  {
    name: "Melee Trainer",
    image: meleeAvatar,
    background: meleeBg,
  },
  {
    name: "Distance Trainer",
    image: distanceAvatar,
    background: distanceBg,
  },
  {
    name: "Magic Trainer",
    image: magicAvatar,
    background: magicBg,
  },
  {
    name: "Resistance Trainer",
    image: resistanceAvatar,
    background: resistanceBg,
  },
];

export default trainersData;
