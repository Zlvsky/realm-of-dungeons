export const getDungeonTitle = (realmDungeon: any, realm: any) => {
    const realmName = realm.name;
    const currentIndex = realmDungeon.currentMonster + 1;
    const monstersLength = 10;

    if (currentIndex >= 11) return `${realmName} dungeon COMPLETED`; 

    return `${realmName} dungeon ${currentIndex}/${monstersLength}`
}