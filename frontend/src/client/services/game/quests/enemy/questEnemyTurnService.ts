import postRequest from "../../../../requests/postRequest";

export const questEnemyTurnService = async () => {
  const result = await postRequest({
    url: "/quest/enemyTurn",
    params: {
      characterId: localStorage.getItem("hero"),
    },
  });
  return result;
};
