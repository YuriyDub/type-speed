import { ReactNode } from "react";
import styles from "./Paper.module.scss";

type PaperPropsType = {
  children: ReactNode;
  className?: string;
};

export const Paper = ({
  children,
  className = "",
}: PaperPropsType): ReactNode => {
  return <div className={`${styles.paper} ${className}`}>{children}</div>;
};
