import postRequest from "../../../requests/postRequest";

export const inviteToGuildService = async (invitedCharacterId: string) => {
  const result = await postRequest({
    url: "/guild/join/invite",
    params: {
      characterId: localStorage.getItem("hero"),
      invitedCharacterId: invitedCharacterId,
    },
  });
  return result;
};