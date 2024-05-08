import styles from "./Avatar.module.scss";

export const Avatar = ({
  url,
  className = "",
  size = "large",
}: {
  url: string;
  className?: string;
  size?: "large" | "small";
}) => {
  return (
    <img
      className={`${styles.avatar} ${styles[size]} ${className}`}
      src={url}
    />
  );
};
