// 15-20
const lowDrops = [
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

export const cryptDungeonEnemies = [
  {
    name: "Crypt Stalker",
    health: 360,
    maxHealth: 360,
    level: 15,
    damage: 40,
    attackText: "Stalker strikes from shadows, dealing ",
    avatar: "https://i.ibb.co/wd1RVcN/1-Crrypt-Stalker.jpg",
    description:
      "A wraith-like Crypt Stalker, born from shadow, moves with silent grace, striking down intruders with a deadly and unseen touch.",
    skills: null,
    rewards: {
      gold: 25,
      xp: 600,
      reputation: 25,
      itemReward: lowDrops,
    },
  },
  {
    name: "Haunted Knight",
    health: 400,
    maxHealth: 400,
    level: 17,
    damage: 45,
    attackText: "Knight swings his ethereal axe, dealing ",
    avatar: "https://i.ibb.co/4t4YdyC/2-Haunted-Knight.jpg",
    description:
      "The Haunted Knight, clad in tattered armor, wields an ethereal axe that cuts through the living and the dead alike, a spectral guardian of the crypt's secrets.",
    skills: null,
    rewards: {
      gold: 30,
      xp: 650,
      reputation: 30,
      itemReward: lowDrops,
    },
  },
  {
    name: "Spider Queen",
    health: 480,
    maxHealth: 480,
    level: 20,
    damage: 49,
    attackText: "The Spider sinks its fangs, dealing ",
    avatar: "https://i.ibb.co/CmNQp04/3-Spider-Queen.jpg",
    description:
      "The Spider Queen, a monstrous arachnid, enshrouds its prey in venomous webs, orchestrating a slow and agonizing demise within the crypt's shadows.",
    skills: null,
    rewards: {
      gold: 35,
      xp: 700,
      reputation: 35,
      itemReward: highDrops,
    },
  },
  {
    name: "Undead Sorcerer",
    health: 500,
    maxHealth: 500,
    level: 22,
    damage: 55,
    attackText: "Sorcerer hurls fire bolts, dealing ",
    avatar: "https://i.ibb.co/gmJMnF2/4-Undead-Sorcerer.jpg",
    description:
      "The Undead Sorcerer, sustained by dark magic, hurls bolts of arcane energy, the crypt's guardian invoking mystic forces to protect its ancient secrets.",
    skills: null,
    rewards: {
      gold: 36,
      xp: 750,
      reputation: 40,
      itemReward: highDrops,
    },
  },
  {
    name: "Guardian Gargoyle",
    health: 500,
    maxHealth: 500,
    level: 25,
    damage: 70,
    attackText: "Gargoyle smash his stone wings, dealing ",
    avatar: "https://i.ibb.co/2qMHxjF/5-Guardian-Gargoyle.jpg",
    description:
      "The Guardian Gargoyle, a Soulforged sentinel, fixates its petrifying gaze on intruders, turning flesh to stone, a silent enforcer of the crypt's forbidden sanctum.",
    skills: null,
    rewards: {
      gold: 38,
      xp: 800,
      reputation: 40,
      itemReward: highDrops,
    },
  },
  {
    name: "Cursed Warden",
    health: 600,
    maxHealth: 600,
    level: 30,
    damage: 80,
    attackText: "Warden thrust his sword, dealing ",
    avatar: "https://i.ibb.co/MZb232V/6-Cursed-Warden.jpg",
    description:
      "The Cursed Warden, draped in shadows, wields his deadly soulbound sword, a , a sentinel cursed to guard the mausoleum's dark secrets.",
    skills: null,
    rewards: {
      gold: 40,
      xp: 900,
      reputation: 45,
      itemReward: highDrops,
    },
  },
  {
    name: "Bloody Necromancer",
    health: 750,
    maxHealth: 750,
    level: 33,
    damage: 85,
    attackText: "Necromancer pawns attack you, dealing ",
    avatar: "https://i.ibb.co/8rLqxRS/7-Bloody-Necromancer.jpg",
    description:
      "The Bloody Necromancer, a twisted cleric, raises an undead horde, orchestrating relentless carnage within the crypt, a harbinger of the plague's curse.",
    skills: null,
    rewards: {
      gold: 40,
      xp: 950,
      reputation: 50,
      itemReward: highDrops,
    },
  },
  {
    name: "Dark Inquistor",
    health: 900,
    maxHealth: 900,
    level: 38,
    damage: 90,
    attackText: "Inquistor swings his giant axe, dealing ",
    avatar: "https://i.ibb.co/RY3gqwG/8-Dark-Inquistor.jpg",
    description:
      "The Dark Inquisitor of Torment, adorned in shadow, wields a massive axe, a relentless interrogator of the crypt's might and forbidden knowledge.",
    skills: null,
    rewards: {
      gold: 40,
      xp: 1200,
      reputation: 55,
      itemReward: highDrops,
    },
  },
  {
    name: "Spirit Queen",
    health: 950,
    maxHealth: 950,
    level: 42,
    damage: 95,
    attackText: "Queen ethereal minions, deal ",
    avatar: "https://i.ibb.co/MhRqJkn/9-Spirit-Queen.jpg",
    description:
      "The Spirit Queen, a vengeful ruler of the ethereal realm, summons minions dealing spectral damage, an enigmatic guardian of the crypt's ethereal mysteries.",
    skills: null,
    rewards: {
      gold: 45,
      xp: 1400,
      reputation: 60,
      itemReward: highDrops,
    },
  },
  {
    name: "The Lich King",
    health: 1200,
    maxHealth: 1200,
    level: 45,
    damage: 120,
    attackText: "Lich King raises skeletal warriors, dealing ",
    avatar: "https://i.ibb.co/W31RBmt/10-The-Lich-King.jpg",
    description:
      "The Lich King, a spectral sovereign of undeath, raises skeletal warriors dealing bone-shattering damage, a ruler commanding the undead legions within the crypt's depths.",
    skills: null,
    rewards: {
      gold: 70,
      xp: 2000,
      reputation: 65,
      itemReward: finalDrops,
    },
  },
];
