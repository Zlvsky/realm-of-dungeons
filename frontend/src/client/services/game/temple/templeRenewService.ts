import postRequest from "../../../requests/postRequest";

export const templeRenewService = async () => {
  const result = await postRequest({
    url: "/temple/renew",
    params: {
      characterId: localStorage.getItem("hero"),
    },
  });
  return result;
};
