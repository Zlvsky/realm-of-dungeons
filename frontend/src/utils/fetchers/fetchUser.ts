import { Dispatch } from "@reduxjs/toolkit";
import { getUserDetails } from "../../client/appClient";
import { handleLogout } from "./handleLogout";
import { setUser } from "../../redux/reducers/userSlice";

export async function fetchUser(dispatch: Dispatch) {
  const response = await getUserDetails();
  if (response.status !== 200) return handleLogout(dispatch);
  dispatch(setUser(response.data));
  return true;
}
