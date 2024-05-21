import styles from "./Avatar.module.scss";

export const Avatar = ({
  url,
  className = "",
  size = "large",
}: {
  url?: string | null;
  className?: string;
  size?: "large" | "medium" | "small";
}) => {
  return (
    <img
      className={`${styles.avatar} ${styles[size]} ${className}`}
      src={
        url ??
        "https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133351928-stock-illustration-default-placeholder-man-and-woman.jpg"
      }
    />
  );
};
