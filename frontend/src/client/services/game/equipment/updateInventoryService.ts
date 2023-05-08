import { AxiosError } from "axios";
import axiosClient from "../../../axiosClient";
import Cookies from "js-cookie";

export interface updateInventoryInterface {
  //   itemId: string;
  slotIndex: number;
}

export const updateInventoryService = async (body: updateInventoryInterface) => {
  const jwt = Cookies.get("jwt");
  try {
    const res = await axiosClient.post(
      "/hero/inventory/update",
      {
        characterId: localStorage.getItem("hero"),
        itemId: "6448488ae6abfd9b53f513e9",
        slotIndev: body.slotIndex,
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
