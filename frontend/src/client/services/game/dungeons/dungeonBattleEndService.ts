import postRequest from "../../../requests/postRequest";

export const dungeonBattleEndService = async () => {
  const result = await postRequest({
    url: "/dungeon/battleEnd",
    params: {
      characterId: localStorage.getItem("hero"),
    },
  });
  return result;
};
