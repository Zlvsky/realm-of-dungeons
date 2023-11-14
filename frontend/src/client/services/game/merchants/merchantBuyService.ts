import postRequest from "../../../requests/postRequest";

export interface IMerchantBuy {
    merchantName: string;
    slotIndex: number;
}

export const merchantBuyService = async (body: IMerchantBuy) => {
  const result = await postRequest({
    url: "/merchant/buy",
    params: {
      characterId: localStorage.getItem("hero"),
      merchantName: body.merchantName,
      slotIndex: body.slotIndex,
    },
  });
  return result;
};
