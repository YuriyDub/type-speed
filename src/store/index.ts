import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import simpleModeSlice from "./slices/simpleModeSlice";
import openAiApi from "../api/openAI";
import rainModeSlice from "./slices/rainModeSlice";
import ratingsSlice from "./slices/ratingsSlice";

export const store = configureStore({
  reducer: {
    simpleMode: simpleModeSlice,
    rainMode: rainModeSlice,
    ratings: ratingsSlice,
    [openAiApi.reducerPath]: openAiApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(openAiApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
