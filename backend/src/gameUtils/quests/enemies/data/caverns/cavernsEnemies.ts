import { IEnemy } from "../../../../../types/account/MainInterfaces";

const defaultEnemyParameters = {
  level: 1,
  maxLevel: 10,
  skills: null,
};

export const cavernsEnemies: { regular: IEnemy[]; bossess: IEnemy[] } = {
  regular: [
    {
      name: "Rotworm",
      avatar: "https://i.ibb.co/zQvYj5W/rotworm.jpg",
      health: 30,
      maxHealth: 30,
      damage: 12,
      attackText: "Rotworm bites you, dealing ",
      ...defaultEnemyParameters,
    },
    {
      name: "Giant Rat",
      avatar: "https://i.ibb.co/2NtxHvw/giant-rat.jpg",
      health: 25,
      maxHealth: 25,
      damage: 8,
      attackText: "Rat bites you with his sharp teeth, dealing ",
      ...defaultEnemyParameters,
    },
    {
      name: "Giant Snake",
      avatar: "https://i.ibb.co/5GzhPzN/giant-snake.jpg",
      health: 35,
      maxHealth: 35,
      damage: 9,
      attackText: "Snake bites into you, dealing ",
      ...defaultEnemyParameters,
    },
    {
      name: "Scorpion",
      avatar: "https://i.ibb.co/S62tt1T/scorpion.jpg",
      health: 20,
      maxHealth: 20,
      damage: 12,
      attackText: "Scorpion stings you, dealing ",
      ...defaultEnemyParameters,
    },
    {
      name: "Tarantula",
      avatar: "https://i.ibb.co/CH5YKtw/tarantula.jpg",
      health: 30,
      maxHealth: 30,
      damage: 10,
      attackText: "Tarantula stings you, dealing ",
      ...defaultEnemyParameters,
    },
    {
      name: "Cobra",
      avatar: "https://i.ibb.co/0XCqq5G/cobra.jpg",
      health: 30,
      maxHealth: 30,
      damage: 10,
      attackText: "Cobra sinks its fangs, dealing ",
      ...defaultEnemyParameters,
    },
    {
      name: "Scarab",
      avatar: "https://i.ibb.co/0qkNzrK/scarab.jpg",
      health: 40,
      maxHealth: 40,
      damage: 9,
      attackText: "Scarab stings you, dealing ",
      ...defaultEnemyParameters,
    },
    {
      name: "Cave Gremlin",
      avatar: "https://i.ibb.co/zVGPxgB/cave-gremlin.jpg",
      health: 30,
      maxHealth: 30,
      damage: 11,
      attackText: "Cave Gremlin thrusts at you, dealing ",
      ...defaultEnemyParameters,
    },
  ],
  bossess: [
    {
      name: "Molten Core Golem",
      avatar: "https://i.ibb.co/bF0Zd0D/molten-core-golem.jpg",
      level: 10,
      maxLevel: 15,
      health: 150,
      maxHealth: 150,
      damage: 30,
      attackText: "Golem hits you, dealing ",
      skills: [
        {
          skillName: "Magma Eruption",
          damage: 35,
          cooldown: 3,
          text: "Pockets of molten rock bursts from ground, dealing ",
        },
        {
          skillName: "Heat Convergence",
          heal: 80,
          cooldown: 4,
          text: "Golem draws heat from enivornment, healing for ",
        },
      ],
    },
  ],
};

