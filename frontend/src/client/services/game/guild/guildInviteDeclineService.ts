import postRequest from "../../../requests/postRequest";

export const guildInviteDeclineService = async (guildId: string) => {
  const result = await postRequest({
    url: "/guild/join/decline",
    params: {
      characterId: localStorage.getItem("hero"),
      guildId: guildId,
    },
  });
  return result;
};
