import { ReactNode } from "react";
import styles from "./Divider.module.scss";

type DividerPropsType = {
  variant?: "horizontal" | "vertical";
};

export const Divider = ({
  variant = "horizontal",
}: DividerPropsType): ReactNode => {
  return <hr className={styles[variant] ?? ""} />;
};
