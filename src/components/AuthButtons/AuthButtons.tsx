import { ReactNode } from "react";
import { MdAdd, MdLogin } from "react-icons/md";
import { Button } from "../UIKit/Button/Button";
import styles from "./AuthButtons.module.scss";
import { Link } from "react-router-dom";

export const AuthButtons = (): ReactNode => {
  return (
    <div className={styles.authButtons}>
      <Link to="/login">
        <Button text="Log In" endIcon={<MdLogin />} />
      </Link>
      <Link to="/signup">
        <Button text="Sign Up" endIcon={<MdAdd />} />
      </Link>
    </div>
  );
};
