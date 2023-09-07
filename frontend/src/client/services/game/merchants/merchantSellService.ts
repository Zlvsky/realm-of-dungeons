import { AxiosError } from "axios";
import axiosClient from "../../../axiosClient";
import Cookies from "js-cookie";

export interface IMerchantSell {
  merchantName: string;
  inventorySlot: number;
}

export const merchantSellService = async (body: IMerchantSell) => {
  const jwt = Cookies.get("jwt");
  try {
    const res = await axiosClient.post(
      "/merchant/sell",
      {
        characterId: localStorage.getItem("hero"),
        merchantName: body.merchantName,
        inventorySlot: body.inventorySlot,
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
