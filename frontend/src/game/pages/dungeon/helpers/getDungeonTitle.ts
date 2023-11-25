export const getDungeonTitle = (realmDungeon: any, realm: any) => {
    const realmName = realm.name;
    const currentIndex = realmDungeon.currentMonster + 1;
    const monstersLength = 10;

    if (currentIndex >= 11) return `${realmName} COMPLETED`; 

    return `${realmName} ${currentIndex}/${monstersLength}`
}