import postRequest from "../../../requests/postRequest";

export interface updateInventoryToEquipmentInterface {
  item: any;
  itemType: string;
  inventorySlotIndex: number;
}

export const updateInventoryToEquipmentService = async (
  body: updateInventoryToEquipmentInterface
) => {
  const result = await postRequest({
    url: "/hero/equipment/update",
    params: {
      characterId: localStorage.getItem("hero"),
      item: body.item,
      itemType: body.itemType,
      inventorySlotIndex: body.inventorySlotIndex,
    },
  });
  return result;
};
