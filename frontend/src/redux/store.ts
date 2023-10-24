import { configureStore } from "@reduxjs/toolkit";
import gameSlice from "./reducers/gameSlice";
import userSlice from "./reducers/userSlice";
import notificationsSlice from "./reducers/notificationsSlice";
import gameNotificationsSlice from "./reducers/gameNotificationSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    game: gameSlice,
    notifications: notificationsSlice,
    gameNotifications: gameNotificationsSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;