import { ReactNode } from "react";
import styles from "./IconButton.module.scss";

type IconButtonPropsType = {
  size?: "small" | "medium" | "large";
  variant?: "primary" | "outlined";
  icon?: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
};

export const IconButton = ({
  size = "medium",
  icon,
  variant = "primary",
  disabled = false,
  onClick,
}: IconButtonPropsType): ReactNode => {
  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${styles[size]} ${styles[variant] ?? ""} ${
        disabled ? styles.disabled : ""
      }`}
    >
      {icon}
    </button>
  );
};
