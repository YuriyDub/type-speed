import { Button } from "../UIKit/Button/Button";
import { ReactNode } from "react";
import styles from "./Header.module.scss";

export const Header = (): ReactNode => {
  return (
    <header className={styles.header}>
      <nav className={styles.navigation}>
        <Button text="Home" shape="right-squared" />
        <Button text="Modes" shape="squared" />
        <Button text="Ratings" shape="left-squared" />
      </nav>
    </header>
  );
};
