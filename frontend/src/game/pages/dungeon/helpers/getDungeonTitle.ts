import { ICharacter } from "../../../../interfaces/MainInterface";

export const getDungeonTitle = (hero: ICharacter, realm: any) => {
    const realmName = realm.name;
    const currentIndex = 1;
    const monstersLength = 10;


    return `${realmName} ${currentIndex}/${monstersLength}`
}