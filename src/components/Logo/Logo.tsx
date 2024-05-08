import { MdOutlineKeyboardAlt } from "react-icons/md";
import { ReactNode } from "react";
import styles from "./Logo.module.scss";

export const Logo = (): ReactNode => {
  return (
    <div className={styles.logoWrap}>
      <MdOutlineKeyboardAlt />
      <h5>SpeedType</h5>
    </div>
  );
};
