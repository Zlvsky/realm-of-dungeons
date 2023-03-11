export interface ICharacter {
    hero: {
        owner: string;
        nickname: string;
        avatar: string;
        class: string;
        progression: {
          level: number;
          levelExperience: number;
        };
        activeQuest: any;
        equipment: string[];
        heroValues: {
          gold: number;
          health: number;
          mana: number;
        };
        statistics: {
          strength: number;
          dexterity: number;
          condition: number;
          intelligence: number;
          wisdom: number;
          charisma: number;
        };
    }
}
