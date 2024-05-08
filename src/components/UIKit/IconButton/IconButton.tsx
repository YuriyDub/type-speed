import { ReactNode } from "react";
import styles from "./IconButton.module.scss";

type IconButtonPropsType = {
  size?: "small" | "medium" | "large";
  variant?: "primary" | "outlined";
  icon?: ReactNode;
  disabled?: boolean;
};

export const IconButton = ({
  size = "medium",
  icon,
  variant = "primary",
  disabled = false,
}: IconButtonPropsType): ReactNode => {
  return (
    <button
      className={`${styles.button} ${styles[size]} ${styles[variant] ?? ""} ${
        disabled ? styles.disabled : ""
      }`}
    >
      {icon}
    </button>
  );
};
