import postRequest from "../../requests/postRequest";

export interface IQuestActionAttack {
  attackPower: "low" | "medium" | "strong";
  battleType: "QUEST" | "DUNGEON";
}

export const battleActionAttackService = async (body: IQuestActionAttack) => {
  const result = await postRequest({
    url: "/battle/action/attack",
    params: {
      characterId: localStorage.getItem("hero"),
      attackPower: body.attackPower,
      battleType: body.battleType,
    },
  });
  return result;
};
