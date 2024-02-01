import postRequest from "../../../requests/postRequest";

export interface IMerchantBuy {
  merchantName: string;
  slotIndex: number;
}

export const createGuildService = async (guildName: string) => {
  const result = await postRequest({
    url: "/guild/create",
    params: {
      characterId: localStorage.getItem("hero"),
      guildName: guildName,
    },
  });
  return result;
};
