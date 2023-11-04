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
            description: "Nothing scary",
            monsters: "10-20",
            fee: "6,00"
        }
      default:
        return {};
    }
}