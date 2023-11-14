import postRequest from "../../../requests/postRequest";

export const trainerTrainService = async (stat: string) => {
  const result = await postRequest({
    url: "/trainer/train",
    params: {
      characterId: localStorage.getItem("hero"),
      stat: stat,
    },
  });
  return result;
};
