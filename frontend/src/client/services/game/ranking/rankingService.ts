import getRequest from "../../../requests/getRequest";

export const rankingService = async (currentPage: number) => {
  const result = await getRequest({
    url: `/ranking/${currentPage}`,
  });
  return result;
};
