import alchemistAvatar from "../../../../assets/images/merchants/alchemist.png";
import treasurerAvatar from "../../../../assets/images/merchants/treasurer.png";
import blacksmithAvatar from "../../../../assets/images/merchants/blacksmith.png";
import witchAvatar from "../../../../assets/images/merchants/witch.png";
import armourerAvatar from "../../../../assets/images/merchants/armourer.png";
import weaponsmithAvatar from "../../../../assets/images/merchants/weaponsmith.png";

const merchantsData = [
  {
    name: "Alchemist",
    image: alchemistAvatar,
    interestedIn: ["potion", "herbs"],
  },
  {
    name: "Treasurer",
    image: treasurerAvatar,
    interestedIn: ["loot"],
  },
  // {
  //   name: "Blacksmith",
  //   image: blacksmithAvatar,
  // },
  {
    name: "Witch",
    image: witchAvatar,
    interestedIn: ["cloth", "staff", "wand", "spellbook"],
  },
  {
    name: "Armourer",
    image: armourerAvatar,
    interestedIn: ["leather", "plate"],
  },
  {
    name: "Weaponsmith",
    image: weaponsmithAvatar,
    interestedIn: ["sword", "axe", "mace", "bow", "crossbow", "shield"],
  },
];

export default merchantsData;