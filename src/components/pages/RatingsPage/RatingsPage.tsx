import { useContext, useEffect } from "react";
import { Container } from "../../UIKit/Container";
import {
  getAllRainModeStatistics,
  getAllSimpleModeStatistics,
} from "../../../api/stats";
import { AuthContext } from "../../AuthProvider";
import { useAppDispatch, useAppSelector } from "../../../store";
import {
  setRainRatingList,
  setSimpleRatingList,
} from "../../../store/slices/ratingsSlice";
import { RatingList } from "./RatingList/RatingList";
import styles from "./RatingsPage.module.scss";

export const RatingsPage = () => {
  const { rainModeRatingList, simpleModeRatingList } = useAppSelector(
    (state) => state.ratings
  );
  const dispatch = useAppDispatch();
  const user = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      getAllSimpleModeStatistics().then((ratings) =>
        dispatch(setSimpleRatingList(ratings ?? []))
      );
      getAllRainModeStatistics().then((ratings) =>
        dispatch(setRainRatingList(ratings ?? []))
      );
    }
  }, []);

  return (
    <div className={styles.page}>
      <Container>
        <div className={styles.contentWrapper}>
          <RatingList title="Simple Mode" ratings={simpleModeRatingList} />
          <RatingList title="Rain Mode" ratings={rainModeRatingList} />
        </div>
      </Container>
    </div>
  );
};
