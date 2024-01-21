import getNextLevelExperience from "../gameUtils/characters/getNextLevelExperience";
import { generateXP } from "../gameUtils/quests/generateQuests";

const testForLevel10 = () => {
  // FOR NORMAL LENGTH
//   const timeStamps = [200, 260, 320];
//   const timeStamps = [300, 360, 420];
  const timeStamps = [840, 900, 960];
  const level10Exp = getNextLevelExperience[10];
  let expSum = 0;
  let level = 1;

  let questNeeded = 0;
  let minutesNeeded = 0;

  while (expSum < level10Exp) {
    const questExp = generateXP("CAVERNS", 2, level, 120);
    const timeStampIndex = Math.round(Math.random() * (timeStamps.length - 1));
    const randomTimeStamp = timeStamps[timeStampIndex];

    expSum += questExp;
    questNeeded++;
    minutesNeeded += randomTimeStamp / 60;

    const nextLevelExp = getNextLevelExperience[level + 1];
    if (expSum > nextLevelExp) level++;
  }

  console.log("--Quests needed for level 10: ", questNeeded);
  console.log(
    "--Minutes needed: ",
    minutesNeeded,
    "-- Hours needed: ",
    minutesNeeded / 60
  );
}
 

const testForLevel25 = () => {
  // FOR NORMAL LENGTH
    const timeStamps = [200, 260, 320];
    // const timeStamps = [300, 360, 420];
//   const timeStamps = [840, 900, 960];
  const level10Exp = getNextLevelExperience[25];
  let expSum = getNextLevelExperience[11];
  let level = 11;

  let questNeeded = 0;
  let minutesNeeded = 0;

  while (expSum < level10Exp) {
    const questExp = generateXP("CRYPT", 0.5, level, 120);
    const timeStampIndex = Math.round(Math.random() * (timeStamps.length - 1));
    const randomTimeStamp = timeStamps[timeStampIndex];

    expSum += questExp;
    questNeeded++;
    minutesNeeded += randomTimeStamp / 60;

    const nextLevelExp = getNextLevelExperience[level + 1];
    if (expSum > nextLevelExp) level++;
  }

  console.log("--Quests needed for level 25: ", questNeeded);
  console.log(
    "--Minutes needed: ",
    minutesNeeded,
    "-- Hours needed: ",
    minutesNeeded / 60
  );
}
 
const testExpGain = () => {
  describe(`Exp Gain test`, () => {
    it("Testing exp gains", async () => {
        // testForLevel10();
        // testForLevel25();
        return true;
    });
  });
};

// testExpGain();

export default true;