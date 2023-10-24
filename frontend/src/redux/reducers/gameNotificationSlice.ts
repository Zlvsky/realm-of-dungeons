import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface NotificationType {
  message: string;
  type: string;
}

const initialState: any = {
  gameNotifications: [],
};

export const gameNotificationsSlice = createSlice({
  initialState,
  name: "gameNotifications",
  reducers: {
    clearGameNotifications: () => initialState,
    setGameNotifications: (state, action: PayloadAction<NotificationType>) => {
      if (
        state.gameNotifications.find(
          (el: any) => el?.message === action.payload.message
        )
      )
        return;
      state.gameNotifications = [...state.gameNotifications, action.payload];
    },
    removeGameNotifications: (state, action) => {
      state.gameNotifications = state.gameNotifications.filter(
        (el: any) => el?.message !== action.payload.message
      );
    },
  },
});

export const getGameNotifications = (state: RootState) =>
  state.gameNotifications.gameNotifications;
export const {
  clearGameNotifications,
  setGameNotifications,
  removeGameNotifications,
} = gameNotificationsSlice.actions;
export default gameNotificationsSlice.reducer;
