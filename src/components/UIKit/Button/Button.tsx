import { MouseEventHandler, ReactNode } from "react";
import styles from "./Button.module.scss";

type ButtonPropsType = {
  text: string;
  size?: "small" | "medium" | "large";
  variant?: "primary" | "outlined";
  shape?: "rounded" | "squared" | "left-squared" | "right-squared";
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  disabled?: boolean;
  onClick?: MouseEventHandler;
};

export const Button = ({
  text = "button",
  size = "medium",
  startIcon,
  endIcon,
  variant = "primary",
  shape = "rounded",
  disabled = false,
  onClick,
}: ButtonPropsType): ReactNode => {
  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${styles[size]} ${styles[variant] ?? ""} ${
        styles[shape] ?? ""
      } ${disabled ? styles.disabled : ""}`}
    >
      <div className={styles.icon}>{startIcon}</div>
      {text}
      <div className={styles.icon}>{endIcon}</div>
    </button>
  );
};
