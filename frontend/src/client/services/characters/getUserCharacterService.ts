import getRequest from "../../requests/getRequest";

export const getUserCharacterService = async (id: string) => {
  const result = await getRequest({
    url: `/user/getCharacter/${id}`,
  });
  return result;
};
