import { UserData } from "../auth/types";

export type SimpleModeStatisticsType = {
  gamesCount: number;
  averageSpeed: number;
  averageAccuracy: number;
  maxSpeed: number;
  mistakesCount: number;
};

export type RainModeStatisticsType = {
  gamesCount: number;
  averageSpeed: number;
  averageAccuracy: number;
  maxSpeed: number;
  mistakesCount: number;
};

export type RainModeStatListElement = {
  user: UserData | null;
  gamesCount: number;
  averageSpeed: number;
  averageAccuracy: number;
  maxSpeed: number;
  mistakesCount: number;
  id: string;
};

export type SimpleModeStatListElement = {
  user: UserData | null;
  gamesCount: number;
  averageSpeed: number;
  averageAccuracy: number;
  maxSpeed: number;
  mistakesCount: number;
  id: string;
};
