import postRequestNoAuth from "../../requests/postRequestNoAuth";

export interface signUpInterface {
  email: string;
  accountname: string;
  password: string;
}

export const signUpService = async (body: signUpInterface) => {
  const result = await postRequestNoAuth({
    url: "/register",
    params: {
      email: body.email,
      accountname: body.accountname,
      password: body.password,
    },
  });
  return result;
};
