import { ReactNode } from "react";
import { Paper } from "../../../UIKit/Paper/Paper";
import styles from "./ModeCard.module.scss";

type ModeCard = {
  title: string;
  description: string;
  imageUrl: string;
  onClick: () => void;
};

export const ModeCard = ({
  title,
  description,
  imageUrl,
  onClick,
}: ModeCard): ReactNode => {
  return (
    <div onClick={onClick} className={styles.cardWrapper}>
      <Paper className={styles.card}>
        <div className={styles.header}>
          <h5 className={styles.title}>{title}</h5>
        </div>
        <img className={styles.image} src={imageUrl} alt={title} />
        <p className={styles.description}>{description}</p>
      </Paper>
    </div>
  );
};
