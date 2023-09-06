import { AxiosError } from "axios";
import axiosClient from "../../../axiosClient";
import Cookies from "js-cookie";

export interface updateEquipmentToInventoryInterface {
  item: any;
  slotIndex: number;
  itemType: string;
}

export const updateEquipmentToInventoryService = async (
  body: updateEquipmentToInventoryInterface
) => {
  const jwt = Cookies.get("jwt");
  console.log(body);
  try {
    const res = await axiosClient.post(
      "/hero/equipmenttoinventory/update",
      {
        characterId: localStorage.getItem("hero"),
        item: body.item,
        slotIndex: body.slotIndex,
        itemType: body.itemType,
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
