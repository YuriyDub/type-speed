import { ChangeEvent, useEffect, useRef } from "react";
import {
  GameState,
  SimpleModeErrorType,
} from "../../../../store/slices/simpleModeSlice";
import { Divider } from "../../../UIKit/Divider";
import { Button } from "../../../UIKit/Button/Button";
import { Paper } from "../../../UIKit/Paper/Paper";
import { Chart } from "react-chartjs-2";
import styles from "./SimplePlayground.module.scss";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from "chart.js";
import {
  MdErrorOutline,
  MdOutlineAccessTime,
  MdOutlineTroubleshoot,
  MdSpeed,
} from "react-icons/md";
import { useCountDown } from "../../../../hooks";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
);

type SimplePlaygroundPropsType = {
  sentence: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  stats: {
    errors: SimpleModeErrorType[];
    accuracy: number;
    speed: number;
    progress: number;
    time: number;
  };
  breakPoints: number[];
  gameState: GameState;
  onStart: () => void;
  onRestart: () => void;
};

export const SimplePlayGround = ({
  sentence,
  value,
  onChange,
  stats,
  breakPoints,
  gameState,
  onStart,
  onRestart,
}: SimplePlaygroundPropsType) => {
  const {
    secondsLeft,
    isFinished: timerIsFinished,
    start,
    restart,
    isStarted,
  } = useCountDown(3);

  const inputRef = useRef<HTMLInputElement>(null);

  const symbols = Array.from(sentence);
  const typedSymbols = Array.from(value);

  const labels =
    gameState === GameState.Finished
      ? [
          ...Array(
            Math.ceil(breakPoints[breakPoints.length - 1] / 1000)
          ).keys(),
        ].filter((value) => value !== 0)
      : [];

  const data = {
    labels,
    datasets: [
      {
        type: "scatter" as const,
        label: "Mistakes",
        backgroundColor: "rgb(255, 99, 132)",
        radius: 5,
        data: labels.map((time) => {
          const startPoint = stats.errors.reduce(
            (acc, error) =>
              error.time / 1000 < time && error.time / 1000 > time - 1
                ? 1
                : acc,
            0
          );

          const endPoint =
            (breakPoints.reduce(
              (acc, breakpoint) => (breakpoint / 1000 < time ? acc + 1 : acc),
              0
            ) /
              time) *
            60;
          return startPoint ? startPoint + endPoint - 1 : null;
        }),
      },
      {
        type: "line" as const,
        label: "Typing speed",
        borderColor: "rgb(75, 192, 192)",
        borderWidth: 2,
        radius: 5,
        cubicInterpolationMode: "monotone",
        fill: false,
        data: labels.map(
          (time) =>
            (breakPoints.reduce(
              (acc, breakpoint) => (breakpoint / 1000 < time ? acc + 1 : acc),
              0
            ) /
              time) *
            60
        ),
      },
    ],
  };

  useEffect(() => {
    if (inputRef.current && gameState !== GameState.Running) {
      inputRef.current.blur();
    }
  }, [gameState]);

  useEffect(() => {
    if (timerIsFinished) {
      onStart();
      handleInputBlur();
    }
  }, [timerIsFinished]);

  const handleInputBlur = () => {
    if (inputRef.current && gameState !== GameState.Finished) {
      inputRef.current.focus();
    }
  };

  const handleStartTyping = () => {
    start();
  };

  const handleRestartTyping = () => {
    onRestart();
    restart();
  };

  return (
    <>
      <Paper>
        <div className={styles.playground}>
          {!timerIsFinished && gameState === GameState.BeforeStart ? (
            <div
              onClick={handleStartTyping}
              className={`${styles.timer} ${
                isStarted ? styles.timerActive : ""
              }`}
            >
              {secondsLeft}
            </div>
          ) : (
            <div className={styles.top}>
              <div className={styles.sentenceWrapper}>
                <div className={styles.typedSentence}>
                  {typedSymbols.map((symbol, index) => (
                    <div
                      key={index}
                      className={`${styles.symbol} ${
                        symbol === symbols[index]
                          ? styles.symbolCorrect
                          : styles.symbolIncorrect
                      }`}
                    >
                      {symbol}
                    </div>
                  ))}
                </div>
                <div className={styles.sentence}>
                  {symbols.map((symbol, index) => (
                    <div key={index} className={styles.symbol}>
                      {symbol}
                    </div>
                  ))}
                </div>
              </div>
              <input
                ref={inputRef}
                onBlur={handleInputBlur}
                onChange={onChange}
                value={value}
              />
              {gameState === GameState.Finished ? (
                <div className={styles.stats}>
                  <Chart
                    className={styles.graph}
                    type="line"
                    data={data}
                    options={{ maintainAspectRatio: false }}
                  />
                </div>
              ) : null}
            </div>
          )}
        </div>
        <Divider />
        <div className={styles.navigation}>
          {gameState === GameState.Finished ? (
            <>
              <div className={styles.restartButton}>
                <Button text="Restart" onClick={handleRestartTyping} />
              </div>
              <div className={styles.numericStats}>
                <>
                  <div>
                    <MdErrorOutline />
                    {stats.errors.length}
                  </div>
                  <div>
                    <MdOutlineTroubleshoot />
                    {(stats.accuracy * 100).toFixed(1)}%
                  </div>
                  <div>
                    <MdOutlineAccessTime />
                    {(stats.time / 1000).toFixed(1)}s
                  </div>
                  <div>
                    <MdSpeed />
                    {stats.speed.toFixed(1)}
                  </div>
                </>
              </div>
            </>
          ) : null}
        </div>
      </Paper>
    </>
  );
};
