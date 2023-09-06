import { getRandomQuests, quests } from "./getRandomQuest";

const getMaxBaseXp = (level: number) => {
    switch (true) {
    case level >= 1 && level <= 10:
      return Math.floor(Math.random() * 201) + 50;
    case level >= 11 && level <= 15:
      return Math.floor(Math.random() * 500) + 200;
    case level >= 16 && level <= 20:
      return Math.floor(Math.random() * 1500) + 400;
    case level >= 21 && level <= 25:
      return Math.floor(Math.random() * 2000) + 700;
    case level >= 26 && level <= 30:
      return Math.floor(Math.random() * 3000) + 1000;
    // Add more cases for other level ranges as needed
    default:
      return 50;
  }
}

const getMaxBaseGold = (level: number) => {
  switch (true) {
    case level >= 1 && level <= 10:
      return Math.floor(Math.random() * 2) + 0.5;
    case level >= 11 && level <= 15:
      return Math.floor(Math.random() * 5) + 2;
    case level >= 16 && level <= 20:
      return Math.floor(Math.random() * 10) + 5;
    case level >= 21 && level <= 25:
      return Math.floor(Math.random() * 20) + 7;
    case level >= 26 && level <= 30:
      return Math.floor(Math.random() * 30) + 10;
    // Add more cases for other level ranges as needed
    default:
      return 10;
  }
};

export const generateXP = (level: number, questIndex: number) => {
    const maxXPGained = 10000;
    const baseXp = getMaxBaseXp(level);
    const experience = baseXp * questIndex;
    if (experience > maxXPGained) return maxXPGained;
    return Math.round(experience * 100) / 100;
}

export const generateGold = (level: number, questIndex: number) => {
    const baseGold = getMaxBaseGold(level);
    const gold = baseGold * questIndex;
    return Math.round(gold * 100) / 100; 
}


const generateQuest = (level: number, quest: {title: string, description: string}, questIndex: number, timeStamps: number[]) => {
    const timeStampIndex = Math.round(Math.random() * (timeStamps.length - 1));
    const randomTimeStamp = timeStamps[timeStampIndex];
    const xp = generateXP(level, questIndex);
    const gold = generateGold(level, questIndex);
    return {
        title: quest.title,
        description: quest.description,
        duration: randomTimeStamp,
        rewards: {
            xp: xp,
            gold: gold
        },
        battleStarted: false,
    }
}

const generateQuests = (level: number) => {
    const randomQuests = getRandomQuests();
    const firstQuest = generateQuest(level, quests[randomQuests[0]], 0.5, [120, 180, 240]);
    const secondQuest = generateQuest(level, quests[randomQuests[1]], 1, [300, 360, 420]);
    const thirdQuest = generateQuest(level, quests[randomQuests[2]], 2, [840, 900, 960]);
    return [
      firstQuest,
      secondQuest,
      thirdQuest
    ]
}

export default generateQuests;