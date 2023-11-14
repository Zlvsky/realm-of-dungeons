import getRequest from "../../../requests/getRequest";

export const getDungeonEnemiesService = async () => {
  const result = await getRequest({
    url: `/dungeon/enemies/${localStorage.getItem("hero")}`,
    params: {
      characterId: localStorage.getItem("hero"),
    },
  });
  return result;
};
