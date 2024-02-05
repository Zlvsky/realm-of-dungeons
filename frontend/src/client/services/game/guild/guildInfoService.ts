import postRequest from "../../../requests/postRequest";

export const guildInfoService = async () => {
  const result = await postRequest({
    url: "/guild",
    params: {
      characterId: localStorage.getItem("hero"),
    },
  });
  return result;
};
