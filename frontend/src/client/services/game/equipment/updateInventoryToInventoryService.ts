import postRequest from "../../../requests/postRequest";

export interface updateInventoryToInventoryInterface {
  item: any;
  slotIndex: number;
  lastIndex: number;
}

export const updateInventoryToInventoryService = async (
  body: updateInventoryToInventoryInterface
) => {
  const result = await postRequest({
    url: "/hero/inventory/update",
    params: {
      characterId: localStorage.getItem("hero"),
      item: body.item,
      slotIndex: body.slotIndex,
      lastIndex: body.lastIndex,
    },
  });
  return result;
};
