import setCookies from "../../../utils/cookies/setCookie";
import postRequestNoAuth from "../../requests/postRequestNoAuth";

export interface signInInterface {
  accountname: string;
  password: string;
}

export const signInService = async (body: signInInterface) => {
  const result = await postRequestNoAuth({
    url: "/login",
    params: {
      accountname: body.accountname,
      password: body.password,
    },
  });
  if (result.status === 200) setCookies(result.data.token);
  return result;
};
