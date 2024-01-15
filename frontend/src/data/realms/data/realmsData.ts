export const realmsData = (destination: string) => {
    switch (destination) {
      case "CAVERNS":
        return {
          value: "CAVERNS",
          name: "Caverns of Echoes",
          description:
            "A vast and ominous underground expanse of dangerous caverns. The realm is rich with treacherous tunnels, hidden chambers, and molten veins, creating a diverse and dangerous environment for adventurers.",
          monsters: "1-10",
          fee: "1,50",
        };
      case "CRYPT":
        return {
          value: "CRYPT",
          name: "Crypt",
          description:
            "Mysterious underground realm filled with shadowy corridors, eerie echoes, and chilling whispers. Ancient tombs and mausoleums line the labyrinthine passages, adorned with cryptic symbols and haunting carvings. Ghostly spirits and undead guardians guard long-forgotten treasures, while the air is thick with an otherworldly chill.",
          monsters: "11-25",
          fee: "6,00",
          unlockLevel: 9,
          orbImage: "https://i.ibb.co/PhRPFFT/crypt-orb.png",
        };
      default:
        return {};
    }
}