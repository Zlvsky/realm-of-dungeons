import { ICharacter } from "../../../../interfaces/MainInterface";

export const isDungeonAvailable = (hero: ICharacter) => {
    const currentRealm = hero.realms.currentRealm;
    const heroLevel = hero.progression.level;

    switch (currentRealm) {
      case "CAVERNS":
        if (heroLevel >= 5) return true;
      case "CRYPT":
        if (heroLevel >= 15) return true;
      default:
        return false;
    }
}