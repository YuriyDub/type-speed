import { KeyboardEvent, useEffect, useRef } from "react";
import { GameState } from "../../../../store/slices/simpleModeSlice";
import { Divider } from "../../../UIKit/Divider";
import { Button } from "../../../UIKit/Button/Button";
import { Paper } from "../../../UIKit/Paper/Paper";
import { Chart } from "react-chartjs-2";
import { Symbol, SymbolPropsType } from "../Symbol";
import styles from "./RainPlayground.module.scss";
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
import { RainModeErrorType } from "../../../../store/slices/rainModeSlice";
import { ALLOWED_SYMBOLS } from "../../../../utils/constants/rainMode";

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

type RainPlaygroundPropsType = {
  symbols: string;
  stats: {
    errors: RainModeErrorType[];
    accuracy: number;
    speed: number;
    progress: number;
    time: number;
  };
  breakPoints: number[];
  gameState: GameState;
  symbolsCount: number;
  symbolElements: SymbolPropsType[];
  onChangeSymbolElements: (symbolsElements: SymbolPropsType[]) => void;
  onStart: () => void;
  onRestart: () => void;
  onKeyDown: (key: string) => void;
};

export const RainPlayGround = ({
  symbols,
  stats,
  breakPoints,
  gameState,
  symbolElements,
  symbolsCount,
  onChangeSymbolElements,
  onKeyDown,
  onStart,
  onRestart,
}: RainPlaygroundPropsType) => {
  const rainWrapperRef = useRef<HTMLDivElement>(null);

  const {
    secondsLeft,
    isFinished: timerIsFinished,
    start,
    restart,
  } = useCountDown(3);

  const graphBaseColor = getComputedStyle(document.body)
    .getPropertyValue("--color-light-text")
    .trim();

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
        backgroundColor: graphBaseColor,
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
        borderColor: graphBaseColor,
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
    if (gameState === GameState.Running) {
      const interval = setInterval(() => {
        const newPositions = [...symbolElements];
        if (symbolElements.length < symbolsCount) {
          newPositions.push({
            symbol: symbols[Math.floor(Math.random() * symbols.length)],
            xPos:
              Math.random() *
              (rainWrapperRef.current?.clientWidth ?? window.innerWidth),
            typed: false,
          });
          onChangeSymbolElements(newPositions);
        }
      }, 300);

      return () => clearInterval(interval);
    }
  }, [symbolElements, gameState]);

  useEffect(() => {
    if (timerIsFinished) {
      onStart();
    }
  }, [timerIsFinished]);

  useEffect(() => {
    const handleKeyDown: EventListener = (event) => {
      const keyboardEvent = event as unknown as KeyboardEvent;
      if (
        ALLOWED_SYMBOLS.includes(keyboardEvent.key) &&
        gameState === GameState.Running
      ) {
        onKeyDown(keyboardEvent.key);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [gameState]);

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
            <div onClick={handleStartTyping} className={styles.timer}>
              {secondsLeft}
            </div>
          ) : (
            <div className={styles.top}>
              <div ref={rainWrapperRef} className={styles.symbolsRain}>
                {symbolElements.map((symbol, index) => (
                  <Symbol
                    key={index}
                    symbol={symbol.symbol}
                    xPos={symbol.xPos}
                    typed={symbol.typed}
                  />
                ))}
              </div>

              {gameState === GameState.Finished ? (
                <div className={styles.stats}>
                  <Chart
                    className={styles.graph}
                    type="line"
                    //@ts-expect-error chart js data-type coincidence
                    data={data}
                    options={{
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          grid: {
                            color: graphBaseColor,
                          },
                          ticks: {
                            color: graphBaseColor,
                          },
                        },
                        x: {
                          grid: {
                            color: graphBaseColor,
                          },
                          ticks: {
                            color: graphBaseColor,
                          },
                        },
                      },
                    }}
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
