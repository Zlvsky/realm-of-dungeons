import { ICharacter } from "./MainInterface";

export interface IHeroProp {
    hero: ICharacter;
}

export interface IGame {
    dimensions: {
        width: number;
        height: number;
        scaleW: number;
        scaleH: number;
    },
    hero: ICharacter | null;
    currentStage: string;
}