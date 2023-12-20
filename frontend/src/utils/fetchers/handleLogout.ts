import { Dispatch } from "@reduxjs/toolkit";
import { logout } from "../../redux/reducers/userSlice";
import Cookies from "js-cookie";

export async function handleLogout(dispatch: Dispatch) {
  dispatch(logout());
  Cookies.remove("jwt");
  window.location.href = "/signin";
}
