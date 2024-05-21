import { ReactNode, useContext, useState } from "react";
import { AuthenticatedButtons } from "../AuthenticatedButtons";
import { AuthButtons } from "../AuthButtons";
import { AuthContext } from "../AuthProvider";
import { Container } from "../UIKit/Container";
import { NavLink } from "react-router-dom";
import { Button } from "../UIKit/Button/Button";
import { Logo } from "../Logo";
import { IconButton } from "../UIKit/IconButton/IconButton";
import { MdDehaze } from "react-icons/md";
import styles from "./Header.module.scss";
import { createPortal } from "react-dom";
import { BurgerSlider } from "./BurgerSlider";

export const Header = (): ReactNode => {
  const [burgerIsOpened, setBurgerIsOpened] = useState(false);
  const isAuth = useContext(AuthContext);

  const handleBurgerSwitch = () => {
    setBurgerIsOpened((prev) => !prev);
  };

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
        <div className={styles.burgerButton}>
          <IconButton onClick={handleBurgerSwitch} icon={<MdDehaze />} />
        </div>
        {burgerIsOpened
          ? createPortal(
              <BurgerSlider
                onClick={handleBurgerSwitch}
                isAuth={Boolean(isAuth)}
              />,
              document.body
            )
          : null}
      </Container>
    </header>
  );
};
