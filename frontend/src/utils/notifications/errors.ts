import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { setGameNotifications } from "../../redux/reducers/gameNotificationSlice";

const displayBadRequest = (message: any, dispatch: Dispatch<AnyAction>) => {
  const alert: any = {
    message: message,
    type: "error",
  };
  dispatch(setGameNotifications(alert));
};

const displayError = (dispatch: Dispatch<AnyAction>, response: any) => {
  if (response.status !== 200 )
    return displayBadRequest(response.data?.message, dispatch);
//   if (response.status === 401) return handleLogout(dispatch);
};

export default displayError;
