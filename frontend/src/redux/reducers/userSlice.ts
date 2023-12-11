import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState: any = {
    user: null
};

export const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    logout: () => initialState,
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});


export const getUser = (state: RootState) => state.user.user;
export const { logout, setUser } = userSlice.actions;
export default userSlice.reducer;