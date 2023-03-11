import { AxiosError } from "axios";
import axiosClient from "../../axiosClient";
import Cookies from "js-cookie";

export interface creaeteCharacterInterface {
  nickname: string;
  class: string;
}

export const createCharacterService = async (body: creaeteCharacterInterface) => {
  const jwt = Cookies.get("jwt");
  try {
    const res = await axiosClient.post(
      "/user/createCharacter",
      {
        nickname: body.nickname,
        class: body.class,
      },
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
    const errors = err as AxiosError;
    const result: any = {
      data: errors.response?.data,
      error: errors.message,
      status: errors.response?.status,
    };
    return result;
  }
};
