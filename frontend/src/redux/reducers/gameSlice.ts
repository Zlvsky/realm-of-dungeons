import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IGame } from "../../interfaces/ComponentsInterfaces";

const initialState: IGame = {
  dimensions: {
    width: 1666,
    height: 937,
    scaleW: 1,
    scaleH: 1,
  },
  hero: null,
  currentStage: "village",
};

export const gameSlice = createSlice({
  initialState,
  name: "game",
  reducers: {
    setDimensions(state, action) {
        state.dimensions = action.payload;
    },
    setHero: (state, action) => {
      state.hero = action.payload;
    },
    setCurrentStage(state, action) {
      state.currentStage = action.payload;
    }
  },
});

export const { setDimensions, setHero, setCurrentStage } = gameSlice.actions;
export const getGameDimensions = (state: RootState) => state.game.dimensions;
export const getHero = (state: RootState) => state.game.hero;
export const getCurrentStage = (state: RootState) => state.game.currentStage;
export default gameSlice.reducer;
