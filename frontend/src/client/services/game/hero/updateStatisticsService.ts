import { AxiosError } from "axios";
import axiosClient from "../../../axiosClient";
import Cookies from "js-cookie";

export interface IUpdateStatistics {
  statistic:
    | "melee"
    | "luck"
    | "resistance"
    | "distance"
    | "magic"
}

export const updateStatisticsService = async (body: IUpdateStatistics) => {
  const jwt = Cookies.get("jwt");
  try {
    const res = await axiosClient.post(
      "/hero/update/statistics",
      {
        characterId: localStorage.getItem("hero"),
        statistic: body.statistic,
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
