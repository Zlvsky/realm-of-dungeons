import { AxiosError } from "axios";
import axiosClient from "../../../axiosClient";
import Cookies from "js-cookie";

export interface updateInventoryToEquipmentInterface {
  item: any;
  itemType: string;
  inventorySlotIndex: number;
}

export const updateInventoryToEquipmentService = async (
  body: updateInventoryToEquipmentInterface
) => {
  const jwt = Cookies.get("jwt");
  try {
    const res = await axiosClient.post(
      "/hero/equipment/update",
      {
        characterId: localStorage.getItem("hero"),
        item: body.item,
        itemType: body.itemType,
        inventorySlotIndex: body.inventorySlotIndex
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
