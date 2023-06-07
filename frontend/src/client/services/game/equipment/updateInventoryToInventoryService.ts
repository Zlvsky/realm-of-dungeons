import { AxiosError } from "axios";
import axiosClient from "../../../axiosClient";
import Cookies from "js-cookie";

export interface updateInventoryToInventoryInterface {
  itemId: string;
  slotIndex: number;
  lastIndex: number;
}

export const updateInventoryToInventoryService = async (
  body: updateInventoryToInventoryInterface
) => {
  const jwt = Cookies.get("jwt");
  console.log(body);
  try {
    const res = await axiosClient.post(
      "/hero/inventory/update",
      {
        characterId: localStorage.getItem("hero"),
        itemId: body.itemId,
        slotIndex: body.slotIndex,
        lastIndex: body.lastIndex,
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