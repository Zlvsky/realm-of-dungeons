import postRequest from "../../../requests/postRequest";

export interface IUpdateStatistics {
  statistic:
    | "melee"
    | "luck"
    | "resistance"
    | "distance"
    | "magic"
}

export const updateStatisticsService = async (body: IUpdateStatistics) => {
  const result = await postRequest({
    url: "/hero/update/statistics",
    params: {
      characterId: localStorage.getItem("hero"),
      statistic: body.statistic,
    },
  });
  return result;
};
