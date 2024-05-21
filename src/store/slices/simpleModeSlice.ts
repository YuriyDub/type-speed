import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { hasNoMoreThanNConsecutiveDifferentChars } from "../../utils/simpleMode";

export enum GameState {
  BeforeStart,
  Running,
  Finished,
}

export type SimpleModeErrorType = {
  index: number;
  time: number;
};

export type SimpleModeStateType = {
  stats: {
    errors: SimpleModeErrorType[];
    accuracy: number;
    speed: number;
    progress: number;
    time: number;
  };
  breakPoints: number[];
  startTime: number;
  endTime: number;
  sentence: string;
  typedSentence: string;
  state: GameState;
};

const initialState: SimpleModeStateType = {
  stats: {
    errors: [],
    accuracy: 1,
    speed: 0,
    progress: 0,
    time: 0,
  },
  breakPoints: [],
  startTime: new Date().getTime(),
  endTime: new Date().getTime(),
  sentence: "",
  typedSentence: "",
  state: GameState.BeforeStart,
};

const simpleModeSlice = createSlice({
  name: "simpleMode",
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
    setSentence: (state, action: PayloadAction<string>) => {
      state.sentence = action.payload;
    },
    setTypedSentence: (state, action: PayloadAction<string>) => {
      const time = new Date().getTime();
      const newStroke = action.payload;
      const canType = hasNoMoreThanNConsecutiveDifferentChars(
        state.sentence,
        newStroke,
        2
      );
      const typedSymbol =
        state.typedSentence.length < newStroke.length
          ? newStroke[newStroke.length - 1]
          : null;

      if (canType || state.typedSentence.length > newStroke.length) {
        state.typedSentence = newStroke;
        state.stats.progress = newStroke.length / state.sentence.length;

        if (typedSymbol === state.sentence[newStroke.length - 1]) {
          state.breakPoints.push(time - state.startTime);
        }

        if (state.sentence.length === newStroke.length) {
          state.endTime = time;
          state.state = GameState.Finished;
          state.stats.time = state.endTime - state.startTime;
          state.stats.speed =
            (state.typedSentence.length / (state.stats.time / 1000)) * 60;
        }
      }

      if (
        typedSymbol &&
        canType &&
        typedSymbol !== state.sentence[newStroke.length - 1]
      ) {
        const error: SimpleModeErrorType = {
          index: state.typedSentence.length - 1,
          time: time - state.startTime,
        };
        const errorCount = state.stats.errors.length;
        const accuracy = errorCount
          ? 1 - errorCount / state.sentence.length
          : 1;

        state.stats.errors.push(error);
        state.stats.accuracy = accuracy < 0 ? 0 : accuracy;
      }
    },
    restart: (state) => {
      state.startTime = 0;
      state.state = GameState.BeforeStart;
      state.typedSentence = "";
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
  setTypedSentence,
  setSentence,
  startTyping,
  finishTyping,
  restart,
} = simpleModeSlice.actions;

export default simpleModeSlice.reducer;
