import postRequest from "../../requests/postRequest";

export const battleActionPotionService = async (battleType: "QUEST" | "DUNGEON") => {
  const result = await postRequest({
    url: "/battle/action/potion",
    params: {
      characterId: localStorage.getItem("hero"),
      battleType: battleType,
    },
  });
  return result;
};
