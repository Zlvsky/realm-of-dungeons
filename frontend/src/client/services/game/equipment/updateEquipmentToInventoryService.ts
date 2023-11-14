import postRequest from "../../../requests/postRequest";

export interface updateEquipmentToInventoryInterface {
  item: any;
  slotIndex: number;
  itemType: string;
  itemSubType: string;
}

export const updateEquipmentToInventoryService = async (
  body: updateEquipmentToInventoryInterface
) => {
  const result = await postRequest({
    url: "/hero/equipmenttoinventory/update",
    params: {
      characterId: localStorage.getItem("hero"),
      item: body.item,
      slotIndex: body.slotIndex,
      itemType: body.itemType,
      itemSubType: body.itemSubType,
    },
  });
  return result;
};
