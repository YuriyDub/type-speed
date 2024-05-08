import { ReactNode } from "react";
import { MdAccountCircle, MdSettings } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { IconButton } from "../UIKit/IconButton/IconButton";
import { signOut } from "firebase/auth";
import { Button } from "../UIKit/Button/Button";
import { auth } from "../../firebase";
import styles from "./AuthenticatedButtons.module.scss";

export const AuthenticatedButtons = (): ReactNode => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className={styles.authButtons}>
      <NavLink to="/account">
        <IconButton icon={<MdAccountCircle />} />
      </NavLink>
      <IconButton icon={<MdSettings />} />
      <Button text="Log out" onClick={handleLogOut} />
    </div>
  );
};
