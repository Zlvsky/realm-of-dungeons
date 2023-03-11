import { AxiosError } from "axios";
import axiosClient from "../../axiosClient";

export interface signUpInterface {
  email: string;
  accountname: string;
  password: string;
}

export const signUpService = async (body: signUpInterface) => {
  try {
    const res = await axiosClient.post("/register", {
      email: body.email,
      accountname: body.accountname,
      password: body.password,
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
    const errors = err as AxiosError;
    const result = {
      data: {},
      error: errors.code,
      status: errors.status,
    };
    return result;
  }
};
