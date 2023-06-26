import { AxiosError } from "axios";
import axiosClient from "../../../../axiosClient";
import Cookies from "js-cookie";

export interface IQuestActionAttack {
  attackPower: "low" | "medium" | "strong";
}

export const questActionAttackService = async (body: IQuestActionAttack) => {
  const jwt = Cookies.get("jwt");
  try {
    const res = await axiosClient.post(
      "/quest/action/attack",
      {
        characterId: localStorage.getItem("hero"),
        attackPower: body.attackPower,
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
