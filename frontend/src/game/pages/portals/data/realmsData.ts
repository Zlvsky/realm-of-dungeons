export const realmsData = (destination: string) => {
    switch (destination) {
      case "CAVE":
        return {
          name: "Cave",
          description:
            "You can draw holy healing water from the magical fountain located in the middle of the temple to heal your wounds",
          monsters: "1-10",
          fee: "1,50",
        };
      case "CRPYT":
        return {
            name: "Crypt",
            description: "Nothing scary",
            monsters: "10-20",
            fee: "6,00"
        }
      default:
        return {};
    }
}