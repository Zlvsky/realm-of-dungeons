import postRequest from "../../../requests/postRequest";

export const guildRequestService = async (guildId: string) => {
  const result = await postRequest({
    url: "/guild/join/request",
    params: {
      characterId: localStorage.getItem("hero"),
      guildId: guildId,
    },
  });
  return result;
};