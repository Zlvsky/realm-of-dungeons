const warriorStats = {
  melee: 10,
  distance: 5,
  magic: 2,
  luck: 2,
  resistance: 5,
};
const mageStats = {
  melee: 5,
  distance: 2,
  magic: 10,
  luck: 5,
  resistance: 5,
};
const archerStats = {
  melee: 5,
  distance: 10,
  magic: 5,
  luck: 8,
  resistance: 5,
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
