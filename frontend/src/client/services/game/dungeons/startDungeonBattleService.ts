import postRequest from "../../../requests/postRequest";

export const startDungeonBattleService = async () => {
  const result = await postRequest({
    url: "/dungeon/startBattle",
    params: {
      characterId: localStorage.getItem("hero"),
    },
  });
  return result;
};
