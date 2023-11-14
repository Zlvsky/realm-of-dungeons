import postRequest from "../../../requests/postRequest";

export const trainerFeeService = async (stat: string) => {
  const result = await postRequest({
    url: "/temple/fee",
    params: {
      characterId: localStorage.getItem("hero"),
      stat: stat,
    },
  });
  return result;
};
