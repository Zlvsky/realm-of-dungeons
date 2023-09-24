const warriorStats = {
  sword: 10,
  axe: 10,
  mace: 10,
  distance: 5,
  magic: 2,
};
const mageStats = {
  sword: 5,
  axe: 2,
  mace: 2,
  distance: 2,
  magic: 10,
};
const archerStats = {
  sword: 5,
  axe: 2,
  mace: 2,
  distance: 10,
  magic: 5,
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
