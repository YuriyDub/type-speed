import { useContext, useEffect, useState } from "react";
import { Paper } from "../../../UIKit/Paper/Paper";
import { getRainModeStatistics } from "../../../../api/stats";
import { AuthContext } from "../../../AuthProvider";
import { RainModeStatisticsType } from "../../../../api/stats/types";
import { MdErrorOutline } from "react-icons/md";
import styles from "./RainModeStats.module.scss";

export const RainModeStats = () => {
  const user = useContext(AuthContext);

  const [stats, setStats] = useState<RainModeStatisticsType>({
    gamesCount: 0,
    averageAccuracy: 0,
    averageSpeed: 0,
    maxSpeed: 0,
    mistakesCount: 0,
  });

  useEffect(() => {
    if (user) {
      getRainModeStatistics(user.uid).then((newStats) => {
        if (newStats) {
          setStats(newStats);
        }
      });
    }
  }, [user]);

  return (
    <Paper className={styles.statsWrapper}>
      <h5>Rain Mode Stats:</h5>
      <ul className={styles.stats}>
        <li className={styles.stat}>
          <b>Games Count:</b>
          <span>{stats?.gamesCount} games</span>
        </li>
        <li className={styles.stat}>
          <b>Max speed:</b>
          <span>{Math.round(stats?.maxSpeed)} s/m</span>
        </li>
        <li className={styles.stat}>
          <b>Average speed:</b>
          <span>{Math.round(stats?.averageSpeed)} s/m</span>
        </li>
        <li className={styles.stat}>
          <b>Average accuracy:</b>
          <span>{(stats.averageAccuracy * 100).toFixed(1)}%</span>
        </li>
        <li className={styles.stat}>
          <b>Average count of mistakes:</b>
          <span>
            {Math.round(stats?.mistakesCount)}
            <MdErrorOutline />
          </span>
        </li>
      </ul>
    </Paper>
  );
};
