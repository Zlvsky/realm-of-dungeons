import axiosClient from "../../axiosClient";
import Cookies from "js-cookie";

export const getUserDetailsService = async () => {
  const jwt = Cookies.get("admin-jwt");
  try {
    const res = await axiosClient.get(
      "/user/details",
      {
        headers: {
          authorization: jwt,
        },
      }
    );
    const result = {
      data: res.data,
      status: res.status,
      statusText: res.statusText,
      headers: res.headers,
      error: "",
    };
    return result;
  } catch (err) {
    const result = {
      data: err.response?.data,
      error: err.message,
      status: err.response?.status,
    };
    return result;
  }
};
