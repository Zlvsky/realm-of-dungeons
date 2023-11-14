import getRequest from "../../requests/getRequest";

export const getCharactersService = async () => {
  const result = await getRequest({
    url: "/user/getUserCharacters",
  });
  return result;
};
