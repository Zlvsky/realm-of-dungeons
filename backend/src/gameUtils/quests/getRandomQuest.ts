export const quests = [
  {
    title: "Lost Heirloom",
    description:
      "Help a grieving noble locate their stolen family heirloom in a treacherous dungeon filled with traps and cunning thieves.",
  },
  {
    title: "Cursed Tomes",
    description:
      "Brave the haunted library and retrieve a collection of cursed tomes before their dark magic corrupts the land.",
  },
  {
    title: "Beast Tamer's Challenge",
    description:
      "Prove your worth by capturing and taming a fearsome legendary beast, hidden deep within a dangerous wilderness.",
  },
  {
    title: "The Spirit's Whisper",
    description:
      "Investigate a village plagued by vengeful spirits and uncover the tragic truth behind their unrest.",
  },
  {
    title: "Treacherous Waters",
    description:
      "Embark on a perilous sea voyage to retrieve a sacred artifact from a notorious pirate captain and his crew.",
  },
  {
    title: "The Enchanted Grove",
    description:
      "Venture into an enchanted grove to break an ancient curse and restore life to a dying forest.",
  },
  {
    title: "The Lost City",
    description:
      "Explore the ruins of a forgotten civilization to unravel its secrets and recover a powerful relic before it falls into the wrong hands.",
  },
  {
    title: "Mystic Alchemy",
    description:
      "Seek rare ingredients in perilous locations to aid an eccentric alchemist in crafting a legendary potion of immense power.",
  },
  {
    title: "Shadowbane's Reign",
    description:
      "Assemble a team to infiltrate a fortress controlled by the sinister warlord, Shadowbane, and put an end to his tyrannical rule.",
  },
  {
    title: "The Forgotten Prophecy",
    description:
      "Decode cryptic riddles, decipher ancient prophecies, and prevent a catastrophic event foretold in the scrolls of a long-lost civilization.",
  },
  {
    title: "The Mysterious Amulet",
    description:
      "Unravel the secrets of a mystical amulet and prevent it from falling into the hands of an evil cult.",
  },
  {
    title: "A Bard's Melody",
    description:
      "Help a renowned bard recover their stolen instrument, scattered across dangerous locations, to restore harmony to the land.",
  },
  {
    title: "The Goblin Menace",
    description:
      "Protect a village under siege by an army of goblins and their cunning leader threatening to overrun the peaceful town.",
  },
  {
    title: "The Dragon's Roar",
    description:
      "Embark on an epic quest to slay a fearsome dragon terrorizing the kingdom and reclaim the stolen treasure.",
  },
  {
    title: "The Curse of the Lich",
    description:
      "Venture into the cursed lair of a powerful lich to break their dark spell and free the trapped souls of innocent victims.",
  },
  {
    title: "The Feywild Portal",
    description:
      "Locate and activate a long-lost portal to the enchanting Feywild, but beware of the mischievous creatures that inhabit it.",
  },
  {
    title: "The Hunt for the Werewolf",
    description:
      "Track down and confront a deadly werewolf that stalks the night, terrorizing a small village with its savage attacks.",
  },
];

export const getRandomQuests = () => {
    const questsArray: Set<number> = new Set();

    while (questsArray.size < 3) {
      const index = Math.floor(Math.random() * quests.length);
      questsArray.add(index);
    }

    return [...questsArray];
}