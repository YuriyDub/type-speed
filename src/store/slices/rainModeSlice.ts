import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SymbolPropsType } from "../../components/pages/RainModePage/Symbol";

export enum GameState {
  BeforeStart,
  Running,
  Finished,
}

export type RainModeErrorType = {
  symbol: string;
  time: number;
};

export type RainModeStateType = {
  stats: {
    errors: RainModeErrorType[];
    accuracy: number;
    speed: number;
    progress: number;
    time: number;
  };
  symbolsCount: number;
  breakPoints: number[];
  startTime: number;
  endTime: number;
  symbols: string;
  symbolsElements: SymbolPropsType[];
  state: GameState;
};

const initialState: RainModeStateType = {
  stats: {
    errors: [],
    accuracy: 1,
    speed: 0,
    progress: 0,
    time: 0,
  },
  symbolsCount: 50,
  breakPoints: [],
  startTime: new Date().getTime(),
  endTime: new Date().getTime(),
  symbols: "",
  symbolsElements: [],
  state: GameState.BeforeStart,
};

const rainModeSlice = createSlice({
  name: "RainMode",
  initialState: initialState,
  reducers: {
    startTyping: (state, action: PayloadAction<number>) => {
      state.startTime = action.payload;
      state.state = GameState.Running;
    },
    finishTyping: (state, action: PayloadAction<number>) => {
      state.endTime = action.payload;
      state.state = GameState.Finished;
      state.stats.time = state.endTime - state.startTime;
    },
    setSymbols: (state, action: PayloadAction<string>) => {
      state.symbols = action.payload;
    },
    setSymbolElements: (state, action: PayloadAction<SymbolPropsType[]>) => {
      state.symbolsElements = action.payload;
    },
    checkKeyDown: (state, action: PayloadAction<string>) => {
      const time = new Date().getTime();
      const key = action.payload;

      if (
        state.symbolsElements.some((element) => element.symbol === key) &&
        state.state === GameState.Running
      ) {
        state.symbolsElements = state.symbolsElements.map((element) => {
          if (element.symbol === key && !element.typed) {
            state.breakPoints.push(time - state.startTime);
            return { ...element, typed: true };
          } else {
            return element;
          }
        });
      } else {
        const error: RainModeErrorType = {
          symbol: key,
          time: time - state.startTime,
        };
        const errorCount = state.stats.errors.length;
        const accuracy = errorCount ? 1 - errorCount / state.symbols.length : 1;

        state.stats.errors.push(error);
        state.stats.accuracy = accuracy < 0 ? 0 : accuracy;
      }

      if (state.symbolsElements.every((element) => element.typed)) {
        const accuracy = 1 - state.stats.errors.length / state.symbolsCount;
        state.endTime = time;
        state.state = GameState.Finished;
        state.stats.time = state.endTime - state.startTime;
        state.stats.speed =
          (state.symbolsElements.length / (state.stats.time / 1000)) * 60;
        state.stats.accuracy = accuracy >= 0 ? accuracy : 0;
      }
    },
    restart: (state) => {
      state.startTime = 0;
      state.state = GameState.BeforeStart;
      state.symbolsElements = [];
      state.startTime = 0;
      state.endTime = 0;
      state.breakPoints = [];
      state.stats = {
        errors: [],
        accuracy: 1,
        speed: 0,
        progress: 0,
        time: 0,
      };
    },
  },
});

export const {
  checkKeyDown,
  setSymbols,
  setSymbolElements,
  startTyping,
  finishTyping,
  restart,
} = rainModeSlice.actions;

export default rainModeSlice.reducer;
