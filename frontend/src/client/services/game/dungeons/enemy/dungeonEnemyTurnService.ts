import postRequest from "../../../../requests/postRequest";

export const dungeonEnemyTurnService = async () => {
  const result = await postRequest({
    url: "/dungeon/enemyTurn",
    params: {
      characterId: localStorage.getItem("hero"),
    },
  });
  return result;
};
