export const questEnemies = [
  {
    name: "Zombie",
    avatar: "https://i.ibb.co/P90zvZ7/zombie.png",
    health: 130,
    damage: 15,
    attackText: "Zombie lunges at you, dealing ",
    statistics: {
      strength: 15,
      dexterity: 5,
      condition: 10,
      intelligence: 2,
      wisdom: 2,
      charisma: 2,
    },
  },
  {
    name: "Ghoul",
    avatar: "https://i.ibb.co/N7BVSM3/ghoul.png",
    health: 120,
    damage: 15,
    attackText: "Ghoul decaying claws, slicing towards you, dealing ",
    statistics: {
      strength: 13,
      dexterity: 10,
      condition: 7,
      intelligence: 2,
      wisdom: 2,
      charisma: 2,
    },
  },
  {
    name: "Skeleton",
    avatar: "https://i.ibb.co/7QGW5Mn/skeleton.png",
    health: 100,
    damage: 17,
    attackText: "Skeleton raises his sword, slicing towards you, dealing ",
    statistics: {
      strength: 16,
      dexterity: 8,
      condition: 6,
      intelligence: 2,
      wisdom: 2,
      charisma: 2,
    },
  },
  {
    name: "Giant Spider",
    avatar: "https://i.ibb.co/prGmg6w/spider.png",
    health: 120,
    damage: 14,
    attackText: "Giant Spider sinking its fangs into your flesh, dealing ",
    statistics: {
      strength: 12,
      dexterity: 15,
      condition: 12,
      intelligence: 5,
      wisdom: 2,
      charisma: 2,
    },
  },
  {
    name: "Goblin",
    avatar: "https://i.ibb.co/26CFMV8/goblin.png",
    health: 100,
    damage: 15,
    attackText:
      "Goblin hurls a barrage of razor-sharp daggers in your direction, dealing ",
    statistics: {
      strength: 8,
      dexterity: 16,
      condition: 12,
      intelligence: 8,
      wisdom: 8,
      charisma: 8,
    },
  },
  {
    name: "Orc",
    avatar: "https://i.ibb.co/WDr2C5r/orc.png",
    health: 130,
    damage: 13,
    attackText:
      "Orc charges forward with brute force, swinging its axe, dealing ",
    statistics: {
      strength: 15,
      dexterity: 5,
      condition: 15,
      intelligence: 10,
      wisdom: 2,
      charisma: 6,
    },
  },
  {
    name: "Werewolf",
    avatar: "https://i.ibb.co/GMkvmwZ/warewolf.jpg",
    health: 150,
    damage: 10,
    attackText:
      "Werewolf's ferocious jaws clamp down on your shoulder, dealing ",
    statistics: {
      strength: 15,
      dexterity: 15,
      condition: 6,
      intelligence: 6,
      wisdom: 2,
      charisma: 2,
    },
  },
  {
    name: "Vampire",
    avatar: "https://i.ibb.co/TbMW9kS/vampire.png",
    health: 140,
    damage: 13,
    attackText:
      "Vampire sinking its fangs into your neck, draining your life force and dealing",
    statistics: {
      strength: 6,
      dexterity: 6,
      condition: 12,
      intelligence: 15,
      wisdom: 15,
      charisma: 10,
    },
  },
];

export const getRandomEnemy = () => {
  const randomIndex = Math.floor(Math.random() * questEnemies.length);
  return questEnemies[randomIndex];
};