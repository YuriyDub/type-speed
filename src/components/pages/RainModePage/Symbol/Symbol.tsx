import styles from "./Symbol.module.scss";

export type SymbolPropsType = {
  symbol: string;
  xPos: number;
  typed: boolean;
};

export const Symbol = ({ symbol, xPos, typed }: SymbolPropsType) => {
  return (
    <span
      className={`${styles.symbol} ${typed ? styles.symbolCorrect : ""}`}
      style={{ left: xPos }}
    >
      {symbol}
    </span>
  );
};
