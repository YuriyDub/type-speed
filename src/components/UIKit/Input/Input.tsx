import { ChangeEvent } from "react";

import styles from "./Input.module.scss";

type InputPropsType = {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  errorMessage?: string;
  successMessage?: string;
  placeholder?: string;
  limit?: number;
  type?: React.HTMLInputTypeAttribute;
};

export const Input = ({
  label,
  value,
  onChange,
  errorMessage,
  successMessage,
  placeholder,
  limit,
  type,
}: InputPropsType) => {
  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    onChange(e.target.value);
  };

  return (
    <div className={styles.input}>
      <div className={styles.header}>
        <span className={styles.label}>{label}</span>
        {limit ? (
          <span className={styles.limit}>
            {value.length}/{limit}
          </span>
        ) : null}
      </div>
      <input
        className={`${styles.inputField} ${
          errorMessage
            ? styles.inputFieldError
            : successMessage
            ? styles.inputFieldSuccess
            : ""
        }`}
        value={value}
        onChange={handleChangeValue}
        placeholder={placeholder}
        maxLength={limit}
        type={type}
      />
      {errorMessage ? (
        <span className={styles.errorMessage}>{errorMessage}</span>
      ) : successMessage ? (
        <span className={styles.successMessage}>{successMessage}</span>
      ) : null}
    </div>
  );
};
