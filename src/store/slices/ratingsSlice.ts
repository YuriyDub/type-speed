import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  RainModeStatListElement,
  SimpleModeStatListElement,
} from "../../api/stats/types";

export type RatingsType = {
  simpleModeRatingList: SimpleModeStatListElement[];
  rainModeRatingList: RainModeStatListElement[];
};

const initialState: RatingsType = {
  simpleModeRatingList: [],
  rainModeRatingList: [],
};

const ratingsSlice = createSlice({
  name: "Ratings",
  initialState: initialState,
  reducers: {
    setSimpleRatingList: (
      state,
      action: PayloadAction<SimpleModeStatListElement[]>
    ) => {
      state.simpleModeRatingList = action.payload;
    },
    setRainRatingList: (
      state,
      action: PayloadAction<SimpleModeStatListElement[]>
    ) => {
      state.rainModeRatingList = action.payload;
    },
  },
});

export const { setSimpleRatingList, setRainRatingList } = ratingsSlice.actions;

export default ratingsSlice.reducer;
