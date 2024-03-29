import { IEnemy } from "../../../../../types/account/MainInterfaces";

const defaultEnemyParameters = {
  level: 11,
  maxLevel: 25,
  skills: null,
};

export const cryptEnemies: { regular: IEnemy[]; bossess: IEnemy[] } = {
  regular: [
    {
      name: "Skeleton Warrior",
      avatar: "https://i.ibb.co/nRVhJVp/skeleton-warrior.jpg",
      health: 70,
      maxHealth: 70,
      damage: 18,
      attackText: "Skeleton swings his spear, dealing ",
      ...defaultEnemyParameters,
    },
    {
      name: "Skeleton Archer",
      avatar: "https://i.ibb.co/vHp9HNL/skeleton-archer.jpg",
      health: 70,
      maxHealth: 70,
      damage: 20,
      attackText: "Skeleton's arrow finds its mark, dealing ",
      ...defaultEnemyParameters,
    },
    {
      name: "Bonebeast",
      avatar: "https://i.ibb.co/8PKt1sP/bonebeast.jpg",
      health: 80,
      maxHealth: 80,
      damage: 18,
      attackText: "Bonebeast slams you, dealing ",
      ...defaultEnemyParameters,
    },
    {
      name: "Crypt Ghouls",
      avatar: "https://i.ibb.co/wrWfNGh/crypt-ghouls.jpg",
      health: 60,
      maxHealth: 60,
      damage: 22,
      attackText: "Ghouls leap at you, dealing ",
      ...defaultEnemyParameters,
    },
    {
      name: "Ghost",
      avatar: "https://i.ibb.co/Jz7VS1Z/ghost.jpg",
      health: 65,
      maxHealth: 65,
      damage: 21,
      attackText: "Ghost's chilling touch passes through you, dealing ",
      ...defaultEnemyParameters,
    },
    {
      name: "Mummy Guardian",
      avatar: "https://i.ibb.co/b6CjxzZ/mummy-guardian.jpg",
      health: 80,
      maxHealth: 80,
      damage: 19,
      attackText: "Mummy heavy leaps you, dealing ",
      ...defaultEnemyParameters,
    },
    {
      name: "Novice of the Cult",
      avatar: "https://i.ibb.co/Tkm8sLz/novice-of-the-cult.jpg",
      health: 50,
      maxHealth: 50,
      damage: 24,
      attackText: "Novice hurls dark energy at you, dealing ",
      ...defaultEnemyParameters,
    },
    {
      name: "Tombstone Spirit",
      avatar: "https://i.ibb.co/Xy7RBwr/tombstone-spirit.jpg",
      health: 60,
      maxHealth: 60,
      damage: 20,
      attackText: "Spectral hand reaches you, dealing ",
      ...defaultEnemyParameters,
    },
    {
      name: "Zombie",
      avatar: "https://i.ibb.co/MgFHzYh/zombie.jpg",
      health: 70,
      maxHealth: 70,
      damage: 20,
      attackText: "Zombie lunges and bites you, dealing ",
      ...defaultEnemyParameters,
    },
  ],
  bossess: [
    {
      name: "Draugr Overlord",
      avatar: "https://i.ibb.co/TY87pyC/draugr-overlord.jpg",
      level: 25,
      maxLevel: 30,
      health: 350,
      maxHealth: 350,
      damage: 50,
      attackText: "Draugr slashes his ancient sword, dealing ",
      skills: [
        {
          skillName: "Eldritch Tombstrike",
          damage: 55,
          cooldown: 3,
          text: "The Draugr Overlord channels dark energies into his blade, slamming it into the ground, dealing ",
        },
        {
          skillName: "Soulbound Resurgence",
          heal: 100,
          cooldown: 4,
          text: "The Draugr Overlord calls upon spectral guardians, healing for ",
        },
      ],
    },
  ],
};
