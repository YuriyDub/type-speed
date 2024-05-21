import { ChangeEvent, useContext, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store";
import { SimplePlayGround } from "./SimplePlayground";
import {
  setSentence,
  startTyping,
  setTypedSentence,
  restart,
  GameState,
} from "../../../store/slices/simpleModeSlice";
import { Container } from "../../UIKit/Container";
import styles from "./SimpleMode.module.scss";
import { generateRandomSentenceQuery } from "../../../api/cohereAI";
import {
  getSimpleModeStatistics,
  saveSimpleModeStatistics,
} from "../../../api/stats";
import { AuthContext } from "../../AuthProvider";
import { SimpleModeStatisticsType } from "../../../api/stats/types";

export const SimpleModePage = () => {
  const { state, breakPoints, sentence, stats, typedSentence } = useAppSelector(
    (state) => state.simpleMode
  );
  const user = useContext(AuthContext);
  const dispatch = useAppDispatch();

  useEffect(() => {
    generateRandomSentenceQuery()
      .then((response) =>
        dispatch(setSentence(response ?? "Lorem ipsum dolor sit amet."))
      )
      .catch(() => dispatch(setSentence("Lorem ipsum dolor sit amet.")));

    return handleTypeRestart;
  }, []);

  useEffect(() => {
    if (state === GameState.Finished && user) {
      getSimpleModeStatistics(user.uid).then((prevStats) => {
        if (prevStats) {
          const prevGamesCount = prevStats.gamesCount;
          const newGamesCount = prevGamesCount + 1;
          const summaryStats: SimpleModeStatisticsType = {
            gamesCount: newGamesCount,
            averageAccuracy:
              prevStats.averageAccuracy != 0
                ? (prevStats.averageAccuracy * prevGamesCount +
                    stats.accuracy) /
                  newGamesCount
                : stats.accuracy,
            averageSpeed:
              prevStats.averageSpeed != 0
                ? (prevStats.averageSpeed * prevGamesCount + stats.speed) /
                  newGamesCount
                : stats.speed,
            maxSpeed:
              prevStats.maxSpeed != 0
                ? prevStats.maxSpeed > stats.speed
                  ? prevStats.maxSpeed
                  : stats.speed
                : stats.speed,
            mistakesCount:
              prevStats.mistakesCount >= 0
                ? (stats.errors.length * prevGamesCount +
                    prevStats.mistakesCount) /
                  newGamesCount
                : prevStats.mistakesCount,
          };

          saveSimpleModeStatistics(user?.uid, summaryStats);
        }
      });
    }
  }, [state, stats]);

  const handleTypeStart = () => {
    dispatch(startTyping(new Date().getTime()));
  };

  const handleTypeRestart = () => {
    generateRandomSentenceQuery()
      .then((response) =>
        dispatch(setSentence(response ?? "Lorem ipsum dolor sit amet."))
      )
      .catch(() => dispatch(setSentence("Lorem ipsum dolor sit amet.")));

    dispatch(restart());
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setTypedSentence(e.target.value));
  };

  return (
    <div className={styles.page}>
      <Container>
        <div className={styles.contentWrapper}>
          <h2>Simple Playground</h2>
          <SimplePlayGround
            sentence={sentence}
            onChange={handleInputChange}
            value={typedSentence}
            breakPoints={breakPoints}
            stats={stats}
            gameState={state}
            onStart={handleTypeStart}
            onRestart={handleTypeRestart}
          />
        </div>
      </Container>
    </div>
  );
};
