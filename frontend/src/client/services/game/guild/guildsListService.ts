import postRequest from "../../../requests/postRequest";

export const guildsListService = async (currentPage: number) => {
  const result = await postRequest({
    url: `/guild/list`,
    params: {
      currentPage: currentPage,
      characterId: localStorage.getItem("hero")
    }
  });
  return result;
};
