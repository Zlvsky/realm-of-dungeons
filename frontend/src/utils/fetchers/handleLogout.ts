import { Dispatch } from "@reduxjs/toolkit";
import { logout } from "../../redux/reducers/userSlice";

export async function handleLogout(dispatch: Dispatch) {
  dispatch(logout());
  window.location.href = "/signin";
}
