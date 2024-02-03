import getRequest from "../../../requests/getRequest";

export const guildsListService = async (currentPage: number) => {
  const result = await getRequest({
    url: `/guild/list/${currentPage}`,
  });
  return result;
};
