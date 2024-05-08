import { ReactNode, useContext } from "react";
import { AuthenticatedButtons } from "../AuthenticatedButtons";
import { AuthButtons } from "../AuthButtons";
import { AuthContext } from "../AuthProvider";
import { Container } from "../UIKit/Container";
import { NavLink } from "react-router-dom";
import { Button } from "../UIKit/Button/Button";
import { Logo } from "../Logo";
import styles from "./Header.module.scss";

export const Header = (): ReactNode => {
  const isAuth = useContext(AuthContext);

  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.leftSide}>
          <NavLink to="/">
            <Logo />
          </NavLink>
        </div>
        <nav className={styles.navigation}>
          {isAuth ? (
            <>
              <NavLink to="/">
                <Button text="Home" />
              </NavLink>
              <NavLink to="/modes">
                <Button text="Modes" />
              </NavLink>
              <NavLink to="/ratings">
                <Button text="Ratings" />
              </NavLink>
            </>
          ) : null}
        </nav>
        <div className={styles.rightSide}>
          {isAuth ? <AuthenticatedButtons /> : <AuthButtons />}
        </div>
      </Container>
    </header>
  );
};
