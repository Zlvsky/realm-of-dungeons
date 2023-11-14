import postRequest from "../../../requests/postRequest";

export interface IMerchantSell {
  merchantName: string;
  inventorySlot: number;
}

export const merchantSellService = async (body: IMerchantSell) => {
  const result = await postRequest({
    url: "/merchant/sell",
    params: {
      characterId: localStorage.getItem("hero"),
      merchantName: body.merchantName,
      inventorySlot: body.inventorySlot,
    },
  });
  return result;
};
