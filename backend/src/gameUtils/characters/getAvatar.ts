const getCharacterAvatar = (heroClass: "warrior" | "mage" | "archer") => {
  switch (heroClass) {
    case "warrior":
      return "https://i.ibb.co/6gRG6JR/warrior.png";
    case "mage":
      return "https://i.ibb.co/LgfgW8D/mage.png";
    case "archer":
      return "https://i.ibb.co/5sBfpDZ/archer.png";
    default:
      return null;
  }
};

export default getCharacterAvatar;