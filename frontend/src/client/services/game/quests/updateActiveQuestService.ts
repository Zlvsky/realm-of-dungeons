import postRequest from "../../../requests/postRequest";

export interface updateActiveQuestInterface {
  questId: string;
}

export const updateActiveQuestService = async (body: updateActiveQuestInterface) => {
  const result = await postRequest({
    url: "/quest/updateActiveQuest",
    params: {
      characterId: localStorage.getItem("hero"),
      questId: body.questId,
    },
  });
  return result;
};
