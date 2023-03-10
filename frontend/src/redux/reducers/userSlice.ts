import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState: any = {
    user: null
};

export const userSlice = createSlice({
    initialState,
    name: "user",
    reducers: {

    },
});

export default userSlice.reducer;