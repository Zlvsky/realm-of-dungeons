import getRequest from "../../../requests/getRequest";

export const characterPreviewService = async (characterId: string) => {
  const result = await getRequest({
    url: `/character/preview/${characterId}`,
  });
  return result;
};