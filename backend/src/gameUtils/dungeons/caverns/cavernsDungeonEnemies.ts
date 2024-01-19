// 6-12
const lowDrops = [
  { itemId: 2303, dropChance: 35 },
  { itemId: 2403, dropChance: 35 },
  { itemId: 2503, dropChance: 35 },
  { itemId: 2203, dropChance: 40 },
  { itemId: 2103, dropChance: 40 },
  { itemId: 2503, dropChance: 40 },
  { itemId: 2304, dropChance: 30 },
  { itemId: 2204, dropChance: 30 },
  { itemId: 2104, dropChance: 30 },
];
// 12-18
const midDrops = [
  { itemId: 2104, dropChance: 40 },
  { itemId: 2103, dropChance: 40 },
  { itemId: 2203, dropChance: 40 },
  { itemId: 2205, dropChance: 40 },
  { itemId: 2403, dropChance: 40 },
  { itemId: 2305, dropChance: 40 },
  { itemId: 2306, dropChance: 40 },
];
// 18-35
const highDrops = [
  { itemId: 2306, dropChance: 50 },
  { itemId: 2307, dropChance: 50 },
  { itemId: 2404, dropChance: 50 },
  { itemId: 2405, dropChance: 20 },
  { itemId: 2206, dropChance: 50 },
  { itemId: 2207, dropChance: 30 },
  { itemId: 2105, dropChance: 50 },
  { itemId: 2106, dropChance: 30 },
];
// boss
const finalDrops = [
  { itemId: 2207, dropChance: 100 },
  { itemId: 2106, dropChance: 100 },
  { itemId: 2405, dropChance: 100 },
];

export const cavernsDungeonEnemies = [
  {
    name: "Obnoxious Rotworm",
    health: 150,
    maxHealth: 150,
    level: 6,
    damage: 12,
    attackText: "Rotworm sinks its teeths in you, dealing ",
    avatar: "https://i.ibb.co/zQ7sfdc/obnoxious-rotworm.jpg",
    description:
      "This colossal creature is a foul embodiment of decay and filth. Its enormous, slimy form slithers through the damp cavern",
    skills: null,
    rewards: {
      gold: 10,
      xp: 250,
      reputation: 10,
      itemReward: lowDrops,
    },
  },
  {
    name: "Mutated Bat",
    health: 200,
    maxHealth: 200,
    level: 8,
    damage: 20,
    attackText: "Bat swoops down, slashing his sharp wings, dealing ",
    avatar: "https://i.ibb.co/yN4c24x/mutated-bat.jpg",
    description:
      "The Mutated Bat is a grotesque aberration of nature, with wings that can shred through flesh and an insatiable thirst for blood.",
    skills: null,
    rewards: {
      gold: 15,
      xp: 350,
      reputation: 15,
      itemReward: lowDrops,
    },
  },
  {
    name: "Giant Spider",
    health: 300,
    maxHealth: 300,
    level: 12,
    damage: 30,
    attackText: "The Spider sinks its fangs, dealing ",
    avatar: "https://i.ibb.co/7WVKq06/Giant-Spider.jpg",
    description:
      "The Giant Spider, with its arachnid horrors, weaves death traps within the caverns, making it a formidable foe with a web-spinning, venomous bite.",
    skills: null,
    rewards: {
      gold: 20,
      xp: 500,
      reputation: 20,
      itemReward: midDrops,
    },
  },
  {
    name: "Werebear",
    health: 380,
    maxHealth: 380,
    level: 15,
    damage: 35,
    attackText: "Werebear punches with incredible fury, dealing ",
    avatar: "https://i.ibb.co/7ys8PdV/Wereboar.jpg",
    description:
      "The Werebear is a cursed creature that has force of strongest animal and intelligence of human, while angry he becomes relentless force of nature.",
    skills: null,
    rewards: {
      gold: 25,
      xp: 600,
      reputation: 25,
      itemReward: midDrops,
    },
  },
  {
    name: "Stone Golem",
    health: 450,
    maxHealth: 450,
    level: 18,
    damage: 40,
    attackText: "Golem pounds the ground, dealing ",
    avatar: "https://i.ibb.co/vs0RKc0/stone-golem.jpg",
    description:
      "The Stone Golem is a massive construct of stone and earth, capable of unleashing devastating seismic attacks within the caverns.",
    skills: null,
    rewards: {
      gold: 30,
      xp: 650,
      reputation: 30,
      itemReward: midDrops,
    },
  },
  {
    name: "Mountain Troll",
    health: 500,
    maxHealth: 500,
    level: 23,
    damage: 50,
    attackText: "Troll slams his fists, dealing ",
    avatar: "https://i.ibb.co/SRDH0Pd/mountain-troll.jpg",
    description:
      "The Mountain Troll is a colossal and brutish creature that hails from the depths of the caverns, wielding the power of the earth to pummel intruders.",
    skills: null,
    rewards: {
      gold: 32.5,
      xp: 700,
      reputation: 35,
      itemReward: highDrops,
    },
  },
  {
    name: "Ancient Geomancer",
    health: 500,
    maxHealth: 500,
    level: 26,
    damage: 60,
    attackText: "Geomancer channels the cavern's energies, dealing ",
    avatar: "https://i.ibb.co/YXVdJcD/Ancient-Geomancer.jpg",
    description:
      "The Ancient Geomancer is a master of earth and stone, manipulating the very terrain to launch deadly attacks, guarding the caverns' secrets.",
    skills: null,
    rewards: {
      gold: 35.5,
      xp: 760,
      reputation: 40,
      itemReward: highDrops,
    },
  },
  {
    name: "Serpent",
    health: 600,
    maxHealth: 600,
    level: 30,
    damage: 60,
    attackText: "Serpent bites you with its venomous fangs, dealing ",
    avatar: "https://i.ibb.co/HzFFTRw/serpent.jpg",
    description:
      "The Serpent is a subterranean terror, known for its strength and the deadly embrace it uses to crush adversaries.",
    skills: null,
    rewards: {
      gold: 35.5,
      xp: 760,
      reputation: 45,
      itemReward: highDrops,
    },
  },
  {
    name: "Obsidian Titan",
    health: 700,
    maxHealth: 700,
    level: 33,
    damage: 70,
    attackText: "Titan swings his giant axe, dealing ",
    avatar: "https://i.ibb.co/BBJDyv4/obsidian-titan.jpg",
    description:
      "The Obsidian Titan is a formidable guardian of the underground, a massive, stone-like creature adorned with obsidian armor and wielding a colossal obsidian axe.",
    skills: null,
    rewards: {
      gold: 35.5,
      xp: 760,
      reputation: 50,
      itemReward: highDrops,
    },
  },
  {
    name: "Crystal Warlord",
    health: 850,
    maxHealth: 850,
    level: 35,
    damage: 90,
    attackText: "Warlord projects shards of crystalline energy, dealing ",
    avatar: "https://i.ibb.co/d4vGk01/crystal-warlord.jpg",
    description:
      "The Crystal Warlord is a majestic yet deadly entity, wielding the power of the cavern's crystals as both armor and weaponry, making it a formidable adversary.",
    skills: null,
    rewards: {
      gold: 50,
      xp: 1000,
      reputation: 60,
      itemReward: finalDrops,
    },
  },
];
