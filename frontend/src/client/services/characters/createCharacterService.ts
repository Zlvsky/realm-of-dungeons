import postRequest from "../../requests/postRequest";

export interface creaeteCharacterInterface {
  nickname: string;
  class: string;
}

export const createCharacterService = async (body: creaeteCharacterInterface) => {
  const result = await postRequest({
    url: "/user/createCharacter",
    params: {
      nickname: body.nickname,
      class: body.class,
    },
  });
  return result;
};
