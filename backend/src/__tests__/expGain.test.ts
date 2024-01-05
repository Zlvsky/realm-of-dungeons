import getNextLevelExperience from "../gameUtils/characters/getNextLevelExperience";
import { generateXP } from "../gameUtils/quests/generateQuests";

const testForLevel10 = () => {
    // FOR NORMAL LENGTH
    const timeStamps = [300, 360, 420];
    const level10Exp = getNextLevelExperience[10];
    let expSum = 0;

    let questNeeded = 0;
    let minutesNeeded = 0;

    while (expSum < level10Exp) {
        const questExp = generateXP("CAVERNS", 1);
        const timeStampIndex = Math.round(Math.random() * (timeStamps.length - 1));
        const randomTimeStamp = timeStamps[timeStampIndex];

        expSum += questExp;
        questNeeded++;
        minutesNeeded += randomTimeStamp / 60;
    }

    console.log("--Quests needed for level 10: ", questNeeded);
    console.log("--Minutes needed: ", minutesNeeded, "-- Hours needed: ", minutesNeeded / 60);
}
 

const testForLevel25 = () => {
    // FOR NORMAL LENGTH
    const timeStamps = [300, 360, 420];
    const level10Exp = getNextLevelExperience[25];
    let expSum = getNextLevelExperience[11];

    let questNeeded = 0;
    let minutesNeeded = 0;

    while (expSum < level10Exp) {
        const questExp = generateXP("CRYPT", 1);
        const timeStampIndex = Math.round(Math.random() * (timeStamps.length - 1));
        const randomTimeStamp = timeStamps[timeStampIndex];

        expSum += questExp;
        questNeeded++;
        minutesNeeded += randomTimeStamp / 60;
    }

    console.log("--Quests needed for level 25: ", questNeeded);
    console.log("--Minutes needed: ", minutesNeeded, "-- Hours needed: ", minutesNeeded / 60);
}
 
const testMobDamage = () => {
  describe(`Exp Gain test`, () => {
    it("Testing exp gains", async () => {
        testForLevel25();
    });
  });
};

testMobDamage();