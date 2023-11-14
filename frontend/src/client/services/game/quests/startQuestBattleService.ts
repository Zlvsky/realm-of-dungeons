import postRequest from "../../../requests/postRequest";

export const startQuestBattleService = async () => {
  const result = await postRequest({
    url: "/quest/startQuestBattle",
    params: {
      characterId: localStorage.getItem("hero"),
    },
  });
  return result;
};
