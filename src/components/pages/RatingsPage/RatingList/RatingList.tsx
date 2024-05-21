import {
  RainModeStatListElement,
  SimpleModeStatListElement,
} from "../../../../api/stats/types";
import { Avatar } from "../../../UIKit/Avatar";
import { Divider } from "../../../UIKit/Divider";
import { Paper } from "../../../UIKit/Paper/Paper";
import styles from "./RatingList.module.scss";

export type RatingsListPropsType = {
  title: string;
  ratings: RainModeStatListElement[] | SimpleModeStatListElement[];
};

export const RatingList = ({ title, ratings }: RatingsListPropsType) => {
  return (
    <Paper className={styles.ratingList}>
      <h5>{title}</h5>
      <Divider />
      {ratings?.length ? (
        <ul>
          <li>
            <span className={styles.label}>№</span>
            <span className={styles.label}>User</span>
            <span className={styles.label}>Max speed</span>
            <span className={styles.label}>Avg Speed</span>
            <span className={styles.label}>Avg Accuracy</span>
          </li>
          {[...ratings]
            ?.sort((x, y) => y.maxSpeed - x.maxSpeed)
            ?.map((rating, index) => (
              <li key={rating.id}>
                <span className={styles.orderNumber}>{`${index + 1}.`}</span>
                <span className={styles.user}>
                  <Avatar size="small" url={rating.user?.photoURL} />
                  <span className={styles.username}>
                    {rating.user?.name ??
                      `unknown_${rating.user?.id.toLowerCase()}`}
                  </span>
                </span>
                <span className={styles.stat}>
                  {rating.maxSpeed.toFixed(1)} s/m
                </span>
                <span className={styles.stat}>
                  {rating.averageSpeed.toFixed(1)} s/m
                </span>
                <span className={styles.stat}>
                  {(rating.averageAccuracy * 100).toFixed(1)}%
                </span>
              </li>
            ))}
        </ul>
      ) : null}
    </Paper>
  );
};
