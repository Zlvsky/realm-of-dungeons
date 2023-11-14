import postRequest from "../../../requests/postRequest";

export const templeHealService = async () => {
  const result = await postRequest({
    url: "/temple/heal",
    params: {
      characterId: localStorage.getItem("hero"),
    },
  });
  return result;
};
