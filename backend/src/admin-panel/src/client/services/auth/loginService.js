import Cookies from "js-cookie";
import axiosClient from "../../axiosClient";

export const signInService = async (body) => {
  try {
    const res = await axiosClient.post(
      "/login",
      {
        accountname: body.accountname,
        password: body.password,
      }
    );
    const result = {
      data: res.data,
      status: res.status,
      statusText: res.statusText,
      headers: res.headers,
      error: "",
    };
    if (result.data.isAdmin) {
      Cookies.set("admin-jwt", result.data.token, { expires: 7 });
    }
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
