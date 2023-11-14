import postRequest from "../../../requests/postRequest";

export const clearActiveQuestService = async () => {
  const result = await postRequest({
    url: "/quest/clearActiveQuest",
    params: {
      characterId: localStorage.getItem("hero"),
    },
  });
  return result;
};
