import { AxiosError } from "axios";
import axiosClient from "../../../axiosClient";
import Cookies from "js-cookie";

export interface updateEquipmentInterface {
//   itemId: string;
  itemType: string;
}

export const updateEquipmentService = async (body: updateEquipmentInterface) => {
  const jwt = Cookies.get("jwt");
  try {
    const res = await axiosClient.post(
      "/hero/equipment/update",
      {
        characterId: "6446d4ba7c601f92b1673302",
        itemId: "64453705533aac12b403eb5a",
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
