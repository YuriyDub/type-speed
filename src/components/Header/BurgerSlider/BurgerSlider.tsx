import { NavLink } from "react-router-dom";
import { Button } from "../../UIKit/Button/Button";
import styles from "./BurgerSlider.module.scss";
import { AuthenticatedButtons } from "../../AuthenticatedButtons";
import { AuthButtons } from "../../AuthButtons";

export type BurgerSliderPropsType = {
  isAuth: boolean;
  onClick: () => void;
};

export const BurgerSlider = ({ isAuth, onClick }: BurgerSliderPropsType) => {
  return (
    <div onClick={onClick} className={styles.burgerSlider}>
      {isAuth ? (
        <nav>
          <NavLink to="/">
            <Button text="Home" size="large" />
          </NavLink>
          <NavLink to="/modes">
            <Button text="Modes" size="large" />
          </NavLink>
          <NavLink to="/ratings">
            <Button text="Ratings" size="large" />
          </NavLink>
        </nav>
      ) : null}
      {isAuth ? <AuthenticatedButtons /> : <AuthButtons />}
    </div>
  );
};
