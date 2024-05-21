import { useContext, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store";
import { RainPlayGround } from "./RainPlayground/RainPlayground";
import { Container } from "../../UIKit/Container";
import styles from "./RainMode.module.scss";
import {
  GameState,
  checkKeyDown,
  restart,
  setSymbolElements,
  startTyping,
} from "../../../store/slices/rainModeSlice";
import {
  getRainModeStatistics,
  saveRainModeStatistics,
} from "../../../api/stats";
import { RainModeStatisticsType } from "../../../api/stats/types";
import { AuthContext } from "../../AuthProvider";
import { ALLOWED_SYMBOLS } from "../../../utils/constants/rainMode";

export const RainModePage = () => {
  const { state, breakPoints, stats, symbolsElements, symbolsCount } =
    useAppSelector((state) => state.rainMode);
  const user = useContext(AuthContext);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (state === GameState.Finished && user) {
      getRainModeStatistics(user.uid).then((prevStats) => {
        if (prevStats) {
          const newGamesCount =
            prevStats.gamesCount != 0 ? prevStats.gamesCount + 1 : 1;
          const summaryStats: RainModeStatisticsType = {
            gamesCount: newGamesCount,
            averageAccuracy:
              prevStats.averageAccuracy != 0
                ? (prevStats.averageAccuracy + stats.accuracy) / newGamesCount
                : stats.accuracy,
            averageSpeed:
              prevStats.averageSpeed != 0
                ? (prevStats.averageSpeed + stats.speed) / newGamesCount
                : stats.speed,
            maxSpeed:
              prevStats.maxSpeed != 0
                ? prevStats.maxSpeed > stats.speed
                  ? prevStats.maxSpeed
                  : stats.speed
                : stats.speed,
            mistakesCount:
              prevStats.mistakesCount >= 0
                ? (stats.errors.length + prevStats.mistakesCount) /
                  newGamesCount
                : prevStats.mistakesCount,
          };

          saveRainModeStatistics(user?.uid, summaryStats);
        }
      });
    }
  }, [state, stats]);

  useEffect(() => {
    return handleTypeRestart;
  }, []);

  const handleTypeStart = () => {
    dispatch(startTyping(new Date().getTime()));
  };

  const handleTypeRestart = () => {
    dispatch(restart());
  };

  return (
    <div className={styles.page}>
      <Container>
        <div className={styles.contentWrapper}>
          <h2>Rain Playground</h2>
          <RainPlayGround
            symbols={ALLOWED_SYMBOLS}
            breakPoints={breakPoints}
            stats={stats}
            gameState={state}
            symbolsCount={symbolsCount}
            onStart={handleTypeStart}
            onRestart={handleTypeRestart}
            symbolElements={symbolsElements}
            onChangeSymbolElements={(elements) =>
              dispatch(setSymbolElements(elements))
            }
            onKeyDown={(key) => dispatch(checkKeyDown(key))}
          />
        </div>
      </Container>
    </div>
  );
};
