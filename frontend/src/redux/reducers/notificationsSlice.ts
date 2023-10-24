import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface NotificationType {
  message: string;
  type: string;
};

const initialState: any = {
  notifications: [],
};

export const notificationsSlice = createSlice({
  initialState,
  name: "notifications",
  reducers: {
    clearNotifications: () => initialState,
    setNotifications: (state, action: PayloadAction<NotificationType>) => {
      if (state.notifications.find((el: any) => el?.message === action.payload.message)) return;
      state.notifications = [...state.notifications, action.payload];
    },
    removeNotifications: (state, action) => {
      state.notifications = state.notifications.filter((el: any) => el?.message !== action.payload.message);
    },
  },
});

export const getNotifications = (state: RootState) => state.notifications.notifications;
export const { clearNotifications, setNotifications, removeNotifications } =
  notificationsSlice.actions;
export default notificationsSlice.reducer;
