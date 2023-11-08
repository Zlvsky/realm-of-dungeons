export const getDungeonTitle = (realmDungeon: any, realm: any) => {
    const realmName = realm.name;
    const currentIndex = realmDungeon.currentMonster + 1;
    const monstersLength = 10;


    return `${realmName} ${currentIndex}/${monstersLength}`
}