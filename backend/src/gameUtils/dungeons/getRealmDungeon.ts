import { ICharacter } from "../../types/account/MainInterfaces";

export const getRealmDungeon = (character: ICharacter) => {
    const realmDungeonIndex = character.dungeons.findIndex(
      (dungeon) => dungeon.realm === character.realms.currentRealm
    );
    const realmDungeon = character.dungeons[realmDungeonIndex];

    return realmDungeon;
}