import Cookies from "js-cookie";
import axiosClient from "../../axiosClient";

export const createItemService = async (body) => {
  const jwt = Cookies.get("admin-jwt");
  try {
    const res = await axiosClient.post("/create/item", body, {
      headers: {
        authorization: jwt,
      },
    });
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
