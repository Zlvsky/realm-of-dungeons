import { AxiosError } from "axios";
import axiosClient from "../../../axiosClient";
import Cookies from "js-cookie";

export interface IMerchantBuy {
    merchantName: string;
    slotIndex: number;
}

export const merchantBuyService = async (body: IMerchantBuy) => {
  const jwt = Cookies.get("jwt");
  try {
    const res = await axiosClient.post(
      "/merchant/buy",
      {
        characterId: localStorage.getItem("hero"),
        merchantName: body.merchantName,
        slotIndex: body.slotIndex,
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
