import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState: any = {
  dimensions: {
    width: 1666,
    height: 937
  },
  scale: 1
};

export const gameSlice = createSlice({
  initialState,
  name: "game",
  reducers: {
    setScale(state, action) {
        state.scale = action.payload;
    },
  },
});

export const { setScale } = gameSlice.actions;
export const getGameDimensions = (state: RootState) => state.game;
export default gameSlice.reducer;
