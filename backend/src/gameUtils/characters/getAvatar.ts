const getCharacterAvatar = (heroClass: "warrior" | "mage" | "archer") => {
  switch (heroClass) {
    case "warrior":
      return "/avatars/warrior.jpg";
    case "mage":
      return "/avatars/mage.jpg";
    case "archer":
      return "/avatars/archer.jpg";
    default:
      return null;
  }
};

export default getCharacterAvatar;