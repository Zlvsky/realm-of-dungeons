import postRequest from "../../../requests/postRequest";

export const changeRealmService = async (realm: string) => {
  const result = await postRequest({
    url: "/realm/change",
    params: {
      characterId: localStorage.getItem("hero"),
      realm: realm,
    },
  });
  return result;
};
