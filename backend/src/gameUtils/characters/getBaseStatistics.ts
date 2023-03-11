const warriorStats = {
  strength: 10,
  dexterity: 5,
  condition: 15,
  intelligence: 4,
  wisdom: 2,
  charisma: 8,
};
const mageStats = {
  strength: 4,
  dexterity: 7,
  condition: 5,
  intelligence: 20,
  wisdom: 15,
  charisma: 12,
};
const archerStats = {
  strength: 8,
  dexterity: 20,
  condition: 10,
  intelligence: 5,
  wisdom: 6,
  charisma: 12,
};

const getBaseStatistics = (heroClass: "warrior" | "mage" | "archer") => {
  switch (heroClass) {
    case "warrior":
      return warriorStats;
    case "mage":
      return mageStats;
    case "archer":
      return archerStats;
    default:
      return null;
  }
};

export default getBaseStatistics;
