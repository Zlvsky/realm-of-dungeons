const warriorDetails = {
  statistics: {
    strength: 10,
    dexterity: 5,
    condition: 15,
    intelligence: 4,
    wisdom: 2,
    charisma: 8,
  },
  avatar: "/avatars/warrior.jpg",
};
const mageDetails = {
  statistics: {
    strength: 4,
    dexterity: 7,
    condition: 5,
    intelligence: 20,
    wisdom: 15,
    charisma: 12,
  },
  avatar: "/avatars/mage.jpg",
};
const archerDetails = {
  statistics: {
    strength: 8,
    dexterity: 20,
    condition: 10,
    intelligence: 5,
    wisdom: 6,
    charisma: 12,
  },
  avatar: "/avatars/archer.jpg",
};

const getClassDetails = (heroClass: any) => {
    switch (heroClass) {
      case "warrior":
        return warriorDetails;
      case "mage":
        return mageDetails;
      case "archer":
        return archerDetails;
      default:
        return {};
    }
}

export default getClassDetails;