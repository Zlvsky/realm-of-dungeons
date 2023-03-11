import { signUpService, signUpInterface } from "./services/auth/registerService";
import { signInInterface, signInService } from "./services/auth/loginService";

export async function register(body: signUpInterface) {
    return await signUpService(body);
}

export async function login(body: signInInterface) {
  return await signInService(body);
}
