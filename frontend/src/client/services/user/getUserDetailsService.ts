import getRequest from "../../requests/getRequest";

export const getUserDetailsService = async () => {
  const result = await getRequest({
    url: "/user/details",
  });
  return result;
};
