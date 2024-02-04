import postRequest from "../../../requests/postRequest";

export const guildJoinService = async (guildId: string) => {
  const result = await postRequest({
    url: "/guild/join",
    params: {
      characterId: localStorage.getItem("hero"),
      guildId: guildId,
    },
  });
  return result;
};
