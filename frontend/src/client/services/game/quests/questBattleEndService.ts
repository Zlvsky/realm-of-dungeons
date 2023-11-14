import postRequest from "../../../requests/postRequest";

export const questBattleEndService = async () => {
  const result = await postRequest({
    url: "/quest/battleEnd",
    params: {
      characterId: localStorage.getItem("hero"),
    },
  });
  return result;
};
