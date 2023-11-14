import postRequest from "../../../requests/postRequest";

export const unlockRealmService = async () => {
  const result = await postRequest({
    url: "/realm/unlock",
    params: {
      characterId: localStorage.getItem("hero"),
    },
  });
  return result;
};
