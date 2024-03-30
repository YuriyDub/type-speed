import { ReactNode } from "react";
import styles from "./Button.module.scss";

type ButtonPropsType = {
  text: string;
  size?: "small" | "medium" | "large";
  variant?: "primary" | "outlined";
  shape?: "rounded" | "squared" | "left-squared" | "right-squared";
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  disabled?: boolean;
};

export const Button = ({
  text = "button",
  size = "medium",
  startIcon,
  endIcon,
  variant = "primary",
  shape = "rounded",
  disabled,
}: ButtonPropsType): ReactNode => {
  return (
    <button
      className={`${styles.button} ${styles[size]} ${
        variant ? styles[variant] : ""
      } ${shape ? styles[shape] : ""} ${disabled ? styles.disabled : ""}`}
    >
      {startIcon}
      {text}
      {endIcon}
    </button>
  );
};
